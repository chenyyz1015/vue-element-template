import type { Directive, DirectiveBinding } from "vue";
import type { PermissionMatchMode } from "@/utils/permission";

type PermissionBindingValue = string | string[];

const normalizePermissions = (value: PermissionBindingValue): string[] =>
  Array.isArray(value) ? value : [value];

const getMatchMode = (
  binding: DirectiveBinding<PermissionBindingValue>
): PermissionMatchMode => (binding.modifiers.all ? "every" : "some");

const toggleElement = (
  el: HTMLElement,
  binding: DirectiveBinding<PermissionBindingValue>
) => {
  const { hasPermission } = usePermission();
  const required = normalizePermissions(binding.value);
  const visible = hasPermission(required, getMatchMode(binding));

  el.style.display = visible ? "" : "none";
};

/** 按钮级权限指令：v-permission="'demo:edit'" 或 v-permission.all="['a','b']" */
export default {
  mounted(el, binding) {
    toggleElement(el, binding);
  },
  updated(el, binding) {
    toggleElement(el, binding);
  },
} satisfies Directive<HTMLElement, PermissionBindingValue>;
