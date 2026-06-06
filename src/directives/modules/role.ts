import type { Directive, DirectiveBinding } from "vue";
import type { PermissionMatchMode } from "@/utils/permission";

type RoleBindingValue = string | string[];

const normalizeRoles = (value: RoleBindingValue): string[] => (Array.isArray(value) ? value : [value]);

const getMatchMode = (binding: DirectiveBinding<RoleBindingValue>): PermissionMatchMode =>
  binding.modifiers.all ? "every" : "some";

const toggleElement = (el: HTMLElement, binding: DirectiveBinding<RoleBindingValue>) => {
  const { hasRole } = usePermission();
  const required = normalizeRoles(binding.value);
  const visible = hasRole(required, getMatchMode(binding));

  el.style.display = visible ? "" : "none";
};

/** 按钮级角色指令：v-role="'admin'" 或 v-role.all="['admin','editor']" */
export default {
  mounted(el, binding) {
    toggleElement(el, binding);
  },
  updated(el, binding) {
    toggleElement(el, binding);
  },
} satisfies Directive<HTMLElement, RoleBindingValue>;
