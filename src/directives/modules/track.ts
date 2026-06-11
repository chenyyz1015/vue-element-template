import type { Directive, DirectiveBinding } from "vue";
import { captureEvent } from "@/utils/posthog";

interface TrackOptions {
  name: string;
  properties?: Record<string, unknown>;
}

type TrackBindingValue = string | TrackOptions;

/** 从指令值中提取事件名 */
const getEventName = (value: TrackBindingValue): string => (typeof value === "string" ? value : value.name);

/** 从指令值中提取附加属性（仅对象形式有） */
const getProperties = (value: TrackBindingValue): Record<string, unknown> | undefined =>
  typeof value === "string" ? undefined : value.properties;

/** 执行事件上报 */
const emit = (value: TrackBindingValue) => {
  const name = getEventName(value);
  if (!name) return;
  captureEvent(name, getProperties(value));
};

/** 创建 DOM 事件回调，触发时上报埋点 */
const createHandler = (value: TrackBindingValue) => (_event?: Event) => {
  emit(value);
};

/** 根据修饰符为元素绑定对应的事件监听 */
const bindHandlers = (
  el: HTMLElement & { __trackHandlers?: Record<string, (e?: Event) => void> },
  binding: DirectiveBinding<TrackBindingValue>
) => {
  const handlers: Record<string, (e?: Event) => void> = {};
  const { modifiers } = binding;

  // 无修饰符 → 挂载时立即上报
  if (Object.keys(modifiers).length === 0) {
    emit(binding.value);
    return;
  }

  if (modifiers.click) {
    handlers.click = createHandler(binding.value);
    el.addEventListener("click", handlers.click);
  }

  if (modifiers.hover) {
    handlers.mouseenter = createHandler(binding.value);
    el.addEventListener("mouseenter", handlers.mouseenter);
  }

  if (modifiers.focus) {
    handlers.focus = createHandler(binding.value);
    el.addEventListener("focus", handlers.focus);
  }

  if (modifiers.show) {
    const handler = createHandler(binding.value);
    handlers.show = handler;
    // IntersectionObserver 检测元素进入视口，一次性上报后断开
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handler();
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
  }

  if (!el.__trackHandlers) {
    el.__trackHandlers = {};
  }
  Object.assign(el.__trackHandlers, handlers);
};

/** 解绑元素上所有由本指令注册的事件监听 */
const unbindHandlers = (el: HTMLElement & { __trackHandlers?: Record<string, (e?: Event) => void> }) => {
  const handlers = el.__trackHandlers ?? {};

  if (handlers.click) el.removeEventListener("click", handlers.click);
  if (handlers.mouseenter) el.removeEventListener("mouseenter", handlers.mouseenter);
  if (handlers.focus) el.removeEventListener("focus", handlers.focus);

  el.__trackHandlers = undefined;
};

/** 声明式埋点指令：
 * - v-track="'event_name'"               → 挂载时触发
 * - v-track.click="'event_name'"         → 点击时触发
 * - v-track.hover="'event_name'"         → 悬停时触发
 * - v-track.focus="'event_name'"         → 聚焦时触发
 * - v-track.show="'event_name'"          → 可见时触发（一次性）
 *
 * 也支持带属性的对象形式：
 * - v-track.click="{ name: 'event_name', properties: { key: 'val' } }"
 */
export default {
  mounted(el, binding) {
    bindHandlers(el, binding);
  },
  unmounted(el) {
    unbindHandlers(el);
  },
} satisfies Directive<HTMLElement, TrackBindingValue>;
