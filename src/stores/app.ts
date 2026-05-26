export const useAppStore = defineStore("app", () => {
  const loading = ref(false);
  const title = ref("Vue Element Template");

  function setLoading(value: boolean) {
    loading.value = value;
  }

  function setTitle(value: string) {
    title.value = value;
  }

  return {
    loading,
    title,
    setLoading,
    setTitle,
  };
});
