export const useAppStore = defineStore(
  "app",
  () => {
    const loading = ref(false);
    const title = ref("Vue Element Template");

    const setLoading = (value: boolean) => {
      loading.value = value;
    };

    const setTitle = (value: string) => {
      title.value = value;
    };

    return {
      loading,
      title,
      setLoading,
      setTitle,
    };
  },
  {
    persist: {
      pick: ["title"],
    },
  }
);
