#!/usr/bin/env bash
# 将 Sentry Issue 标为 resolved / ignored（自托管与 SaaS 通用）
# 构建用 Organization Token（org:ci）与闭环用 Token 分离（见 .env.sentry-resolve.example）
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

STATUS="resolved"
DRY_RUN=false
ISSUE_IDS=()
# 实际用于 API 的 Bearer（优先 SENTRY_RESOLVE_AUTH_TOKEN）
SENTRY_API_TOKEN=""

usage() {
  cat <<'EOF'
用法: scripts/sentry-resolve.sh [选项] <issue_id> [issue_id ...]

  issue_id  数字 ID（如 4）或短 ID（如 VUE-ELEMENT-TEMPLATE-4）

选项:
  --status <resolved|ignored>   目标状态（默认 resolved）
  --dry-run                     仅打印请求，不修改 Sentry
  -h, --help                    显示帮助

环境变量:
  SENTRY_URL、SENTRY_ORG     可与 .env.sentry-build-plugin 共用
  SENTRY_RESOLVE_AUTH_TOKEN  推荐：User Auth Token（event:write），见 .env.sentry-resolve
  SENTRY_AUTH_TOKEN          仅当含 event:write 时作兜底；Organization Token 通常仅 org:ci

加载顺序（先加载的文件不覆盖已存在的变量）:
  .env.sentry-build-plugin → .env.sentry-resolve → shell 环境

示例:
  ./scripts/sentry-resolve.sh 4
  npm run sentry:resolve -- VUE-ELEMENT-TEMPLATE-4
EOF
}

load_env_file() {
  local file="$1"
  [[ -f "$file" ]] || return 0
  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line%%#*}"
    line="$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
    [[ -z "$line" ]] && continue
    [[ "$line" != *"="* ]] && continue
    local key="${line%%=*}"
    local value="${line#*=}"
    key="$(echo "$key" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
    value="$(echo "$value" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
    value="${value%\"}"
    value="${value#\"}"
    value="${value%\'}"
    value="${value#\'}"
    if [[ -z "${!key:-}" ]]; then
      export "$key=$value"
    fi
  done <"$file"
}

load_sentry_env() {
  load_env_file "$ROOT/.env.sentry-build-plugin"
  load_env_file "$ROOT/.env.sentry-resolve"
}

select_api_token() {
  if [[ -n "${SENTRY_RESOLVE_AUTH_TOKEN:-}" ]]; then
    SENTRY_API_TOKEN="$SENTRY_RESOLVE_AUTH_TOKEN"
    return 0
  fi
  if [[ -n "${SENTRY_AUTH_TOKEN:-}" ]]; then
    SENTRY_API_TOKEN="$SENTRY_AUTH_TOKEN"
    return 0
  fi
  return 1
}

require_env() {
  local missing=()
  [[ -z "${SENTRY_URL:-}" ]] && missing+=("SENTRY_URL")
  [[ -z "${SENTRY_ORG:-}" ]] && missing+=("SENTRY_ORG")
  if ((${#missing[@]} > 0)); then
    echo "[sentry-resolve] 缺少环境变量: ${missing[*]}" >&2
    echo "请在 .env.sentry-build-plugin 配置 SENTRY_URL、SENTRY_ORG" >&2
    exit 1
  fi
  if ! select_api_token; then
    echo "[sentry-resolve] 缺少 SENTRY_RESOLVE_AUTH_TOKEN（推荐）或带 event:write 的 SENTRY_AUTH_TOKEN" >&2
    echo "复制 .env.sentry-resolve.example → .env.sentry-resolve 并填写 User Token" >&2
    exit 1
  fi
  SENTRY_URL="${SENTRY_URL%/}"
}

# 校验 Token 是否含 event:write（GET /api/0/ 返回 auth.scopes）
assert_token_can_update_issues() {
  local auth_json scopes
  auth_json="$(curl -fsS "${SENTRY_URL}/api/0/" \
    -H "Authorization: Bearer ${SENTRY_API_TOKEN}" 2>/dev/null || true)"
  scopes="$(echo "$auth_json" | node -e "
    const input = require('fs').readFileSync(0, 'utf8');
    try {
      const scopes = JSON.parse(input)?.auth?.scopes;
      if (Array.isArray(scopes)) process.stdout.write(scopes.join(' '));
    } catch { /* ignore */ }
  " 2>/dev/null || true)"

  if [[ -z "$scopes" ]]; then
    return 0
  fi
  if [[ "$scopes" == *"event:write"* || "$scopes" == *"event:admin"* ]]; then
    return 0
  fi

  echo "[sentry-resolve] 当前 Token 权限不足: scopes=[$scopes]" >&2
  if [[ "$scopes" == "org:ci" ]]; then
    echo "  Organization Token 在 Sentry 中固定为 org:ci（Source Map / Release），无法 resolve Issue。" >&2
  fi
  echo "  请使用 User Auth Token（个人设置 → Auth Tokens），勾选 event:write。" >&2
  echo "  写入 .env.sentry-resolve.local：SENTRY_RESOLVE_AUTH_TOKEN=<token>" >&2
  echo "  或于 Sentry UI 手动 Resolve；MCP 若已配置独立凭证亦可拉取 Issue。" >&2
  exit 1
}

resolve_numeric_id() {
  local ref="$1"
  if [[ "$ref" =~ ^[0-9]+$ ]]; then
    echo "$ref"
    return 0
  fi

  local query
  query="$(python3 -c 'import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))' "$ref")"
  local url="${SENTRY_URL}/api/0/organizations/${SENTRY_ORG}/issues/?query=${query}&limit=1"
  local response
  response="$(curl -fsS "$url" \
    -H "Authorization: Bearer ${SENTRY_API_TOKEN}" \
    -H "Content-Type: application/json")"

  local numeric_id
  numeric_id="$(echo "$response" | node -e "
    const input = require('fs').readFileSync(0, 'utf8');
    let data;
    try { data = JSON.parse(input); } catch { process.exit(1); }
    const list = Array.isArray(data) ? data : [];
    const id = list[0]?.id;
    if (id == null) process.exit(1);
    process.stdout.write(String(id));
  ")"

  if [[ -z "$numeric_id" ]]; then
    echo "[sentry-resolve] 无法解析 Issue: $ref" >&2
    return 1
  fi
  echo "$numeric_id"
}

update_issue() {
  local numeric_id="$1"
  local url="${SENTRY_URL}/api/0/organizations/${SENTRY_ORG}/issues/${numeric_id}/"
  local body
  body="$(printf '{"status":"%s"}' "$STATUS")"

  if [[ "$DRY_RUN" == true ]]; then
    echo "[dry-run] PUT $url"
    echo "[dry-run] body: $body"
    return 0
  fi

  curl -fsS -X PUT "$url" \
    -H "Authorization: Bearer ${SENTRY_API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "$body" >/dev/null

  echo "[sentry-resolve] Issue #${numeric_id} → ${STATUS}"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --status)
      STATUS="${2:-}"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    -h | --help)
      usage
      exit 0
      ;;
    -*)
      echo "[sentry-resolve] 未知选项: $1" >&2
      usage >&2
      exit 1
      ;;
    *)
      ISSUE_IDS+=("$1")
      shift
      ;;
  esac
done

if [[ "$STATUS" != "resolved" && "$STATUS" != "ignored" ]]; then
  echo "[sentry-resolve] --status 仅支持 resolved 或 ignored" >&2
  exit 1
fi

if ((${#ISSUE_IDS[@]} == 0)); then
  usage >&2
  exit 1
fi

load_sentry_env
require_env
assert_token_can_update_issues

for ref in "${ISSUE_IDS[@]}"; do
  numeric_id="$(resolve_numeric_id "$ref")"
  update_issue "$numeric_id"
done

echo "[sentry-resolve] 完成 ${#ISSUE_IDS[@]} 个 Issue"
