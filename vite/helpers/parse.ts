import type { ProxyOptions } from "vite";

export function parseProxy(proxyStr: string): Record<string, ProxyOptions> {
  let proxys: string[][] = [];
  try {
    proxys = JSON.parse(proxyStr || "[]");
  } catch (e) {
    console.error("解析 proxyStr 失败：", e);
    proxys = [];
  }
  const proxy: Record<string, ProxyOptions> = {};
  for (const [prefix, target, rewriteTo] of proxys) {
    proxy[prefix] = {
      target,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), rewriteTo),
      changeOrigin: true,
    };
  }
  return proxy;
}
