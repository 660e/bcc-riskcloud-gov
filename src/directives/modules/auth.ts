import { useAuthStore } from '@/stores/modules/auth';
import type { Directive, DirectiveBinding } from 'vue';

const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const $authStore = useAuthStore();
    const permissions = $authStore.authButtonListGet;
    const { value } = binding;

    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = permissions.some(permission => {
        return permission === '*:*:*' || value.includes(permission);
      });

      if (!hasPermission) el.parentNode && el.parentNode.removeChild(el);
    } else {
      throw new Error('请设置权限标识');
    }
  }
};

export default auth;
