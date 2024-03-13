/**
 * @description menu
 */
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', () => {
  const show = ref(true);

  const setShowValue = (val) => {
    show.value = val;
  };

  return { show, setShowValue };
});
