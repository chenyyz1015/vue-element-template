import { LANDING_SECTION_IDS } from "@/views/landing/constants";

export const useSiteHeaderNav = () => {
  const router = useRouter();
  const route = useRoute();
  const { t, locale, localeOptions, setLocale } = useLocale();

  const mobileMenuOpen = ref(false);

  const isHome = computed(() => route.path === "/");

  const sectionLinks = computed(() => [
    { id: LANDING_SECTION_IDS.features, label: t("landing.nav.features") },
    { id: LANDING_SECTION_IDS.compare, label: t("landing.nav.compare") },
    {
      id: LANDING_SECTION_IDS.integrations,
      label: t("landing.nav.integrations"),
    },
  ]);

  const routeLinks = computed(() => [
    { path: "/demo", label: t("nav.demo") },
    { path: "/about", label: t("nav.about") },
  ]);

  const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
  };

  const openMobileMenu = () => {
    mobileMenuOpen.value = true;
  };

  const scrollToSection = (id: string) => {
    closeMobileMenu();

    if (route.path !== "/") {
      router.push({ path: "/", hash: `#${id}` });
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateTo = async (path: string) => {
    closeMobileMenu();
    await router.push(path);
  };

  const goHome = async () => {
    closeMobileMenu();
    await router.push("/");
  };

  const openDocs = () => {
    closeMobileMenu();
    window.open(
      import.meta.env.VITE_GITHUB_URL,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const goToDemo = async () => {
    closeMobileMenu();
    await router.push("/demo");
  };

  onMounted(() => {
    if (route.hash) {
      const id = route.hash.slice(1);
      nextTick(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  });

  watch(
    () => route.hash,
    (hash) => {
      if (!hash || route.path !== "/") return;
      nextTick(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({
          behavior: "smooth",
        });
      });
    }
  );

  watch(
    () => route.fullPath,
    () => {
      closeMobileMenu();
    }
  );

  watch(mobileMenuOpen, (open) => {
    document.body.style.overflow = open ? "hidden" : "";
  });

  const isDesktopNav = useMediaQuery("(min-width: 1024px)");

  watch(isDesktopNav, (desktop) => {
    if (desktop) {
      closeMobileMenu();
    }
  });

  onUnmounted(() => {
    document.body.style.overflow = "";
  });

  return {
    route,
    t,
    locale,
    localeOptions,
    setLocale,
    mobileMenuOpen,
    isHome,
    sectionLinks,
    routeLinks,
    closeMobileMenu,
    openMobileMenu,
    scrollToSection,
    navigateTo,
    goHome,
    openDocs,
    goToDemo,
  };
};
