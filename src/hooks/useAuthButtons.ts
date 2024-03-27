import { computed } from 'vue';
import { useAuthStore } from '@/stores/modules/auth';

export const useAuthButtons = () => {
  const $authStore = useAuthStore();

  const BUTTONS = computed(() => {
    const authButtons: { [key: string]: boolean } = {};
    $authStore.authButtonListGet.forEach((item: string) => {
      authButtons[item] = true;
    });
    return authButtons;
  });

  return { BUTTONS };
};
