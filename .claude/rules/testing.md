# 测试规范

> 当前项目尚未安装 Vitest / @vue/test-utils，以下为推荐测试栈与编写规范；接入时在 `package.json` 中补充依赖并添加 `test` 脚本。

## 测试策略

本项目采用分层测试策略：

| 层级     | 工具                     | 覆盖范围                 |
| -------- | ------------------------ | ------------------------ |
| 单元测试 | Vitest                   | composables、api、stores |
| 组件测试 | @vue/test-utils + Vitest | Vue 组件                 |
| E2E 测试 | Playwright（可选）       | 关键用户流程             |

## 文件组织

```
src/
├── api/
│   ├── request/
│   ├── index.ts
│   ├── modules/
│   │   └── user.ts
│   └── types/
│       ├── common.d.ts
│       └── user.d.ts
├── composables/
│   └── __tests__/
│       └── useCounter.test.ts
└── stores/
    └── modules/
        └── __tests__/
            └── app.test.ts
```

- 测试文件放在 `__tests__/` 目录或与源文件同级的 `*.test.ts`
- 测试文件命名：`{module}.test.ts`

## 编写原则

1. **测试行为，不测试实现** — 关注输入输出，不绑定内部变量名
2. **单一断言原则** — 每个 test case 验证一个行为
3. **可读性优先** — 使用 `describe` / `it` 描述测试场景
4. **隔离性** — 测试间不共享状态，使用 `beforeEach` 重置

## Composable 测试示例

```typescript
import { describe, it, expect } from "vitest";
import { useCounter } from "../useCounter";

describe("useCounter", () => {
  it("should increment count", () => {
    const { count, increment } = useCounter();
    increment();
    expect(count.value).toBe(1);
  });
});
```

## Store 测试示例

```typescript
import { setActivePinia, createPinia } from "pinia";
import { beforeEach, describe, it, expect } from "vitest";
import { useAppStore } from "../app";

describe("useAppStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should set loading state", () => {
    const store = useAppStore();
    store.setLoading(true);
    expect(store.loading).toBe(true);
  });
});
```

## 运行命令

接入 Vitest 后建议在 `package.json` 中添加：

```bash
npm test                # 运行所有测试
npm run test:watch      # 监听模式
npm run test:coverage   # 覆盖率报告
```

## AI 辅助测试

当要求编写测试时：

- 优先覆盖核心业务逻辑和边界条件
- 不编写仅验证框架行为的 trivial 测试
- Mock 外部依赖（API、`@/utils/auth` / `@/utils/locale` 等封装），不 Mock 被测模块本身
