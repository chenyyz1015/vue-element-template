export default {
  app: {
    title: "Vue Element Template",
  },
  route: {
    home: "Home",
    about: "About",
    demo: "Demo",
  },
  nav: {
    home: "Home",
    about: "About",
    demo: "Demo",
  },
  home: {
    description:
      "A project template built with Vite, Vue 3, TypeScript, Pinia, Element Plus, and UnoCSS.",
    startupSuccess: "Application started successfully!",
    tag: "Vue 3 + Element Plus",
  },
  about: {
    eyebrow: "About Project",
    title: "About Vue Element Template",
    description:
      "An out-of-the-box Vue 3 enterprise frontend template with AI tooling configuration (Claude Code / Cursor).",
    techStack: {
      eyebrow: "Tech Stack",
      title: "Complete Modern Frontend Toolchain",
      subtitle:
        "From build tooling to UI, state, and i18n — everything is ready out of the box.",
      items: {
        vite: {
          name: "Vite",
          description: "Next-generation frontend build tool",
        },
        vue: { name: "Vue 3", description: "Progressive JavaScript framework" },
        typescript: {
          name: "TypeScript",
          description: "Typed superset of JavaScript",
        },
        pinia: { name: "Pinia", description: "Official Vue state management" },
        piniaPersist: {
          name: "pinia-plugin-persistedstate",
          description: "Pinia state persistence",
        },
        elementPlus: {
          name: "Element Plus",
          description: "Vue 3 component library",
        },
        unocss: { name: "UnoCSS", description: "Atomic CSS engine" },
        axios: { name: "Axios", description: "HTTP client" },
        vueuse: {
          name: "VueUse",
          description: "Composable utilities (auto-imported)",
        },
        vueI18n: {
          name: "vue-i18n",
          description: "Internationalization (Composition API + TypeScript)",
        },
        dayjs: { name: "dayjs", description: "Date handling (Chinese locale)" },
        lodashEs: {
          name: "lodash-es",
          description: "Utility functions (manual import)",
        },
        svgComponent: {
          name: "unplugin-svg-component",
          description: "SVG icon components",
        },
      },
    },
    aiTools: {
      eyebrow: "AI Development",
      title: "AI Toolchain Integration",
      subtitle:
        "Built-in Claude Code / Cursor config for more efficient AI-assisted development.",
      items: {
        claude: {
          title: "Claude Code",
          description:
            "CLAUDE.md, Rules, and Commands for slash-command workflows.",
        },
        cursor: {
          title: "Cursor",
          description:
            ".cursor/rules and Skills for in-IDE AI-assisted coding.",
        },
        agents: {
          title: "AGENTS.md",
          description:
            "Universal Agent instructions compatible with major AI dev tools.",
        },
      },
    },
    cta: {
      title: "Want to see it in action?",
      subtitle:
        "Visit the Demo page to explore the template and quick-start guide.",
      button: "Open Demo",
    },
  },
  demo: {
    eyebrow: "Live Demo",
    title: "Template Demo",
    subtitle:
      "This is the Vue Element Template demo environment showcasing components, i18n, and conventions.",
    statusTitle: "Application Ready",
    statusMessage: "Application started successfully!",
    quickStart: {
      eyebrow: "Quick Start",
      title: "Get Started in 3 Steps",
    },
    steps: {
      clone: {
        title: "Clone the Repo",
        description:
          "git clone the repository and cd into the project directory.",
      },
      install: {
        title: "Install Dependencies",
        description: "Run npm install to install all packages.",
      },
      dev: {
        title: "Start Dev Server",
        description: "Run npm run dev and open localhost:5173 in your browser.",
      },
    },
    cta: {
      title: "Want the full tech stack?",
      subtitle:
        "Visit the About page for all integrated tools and AI config details.",
      button: "View About",
    },
  },
  devtools: {
    brand: "Vue DevTools",
    nav: {
      features: "Features",
      compare: "Compare",
      integrations: "Integrations",
      docs: "Docs",
      cta: "Run Demo",
    },
    hero: {
      badge: "v1.0 · developer-first",
      title: "The minimal toolchain for",
      titleAccent: "Vue apps",
      subtitle:
        "Strict TypeScript, auto-imports, AI config, Lint CI — zero-config start, focus on product code.",
      ctaPrimary: "Try it now",
      ctaDocs: "Read docs",
    },
    code: {
      tabs: {
        cli: "terminal",
        config: "vite.config.ts",
        component: "index.vue",
      },
      filename: {
        cli: "terminal — zsh",
        config: "vite.config.ts",
        component: "src/views/home/index.vue",
      },
      cli: {
        comment: "start in 30 seconds",
      },
    },
    features: {
      eyebrow: "features",
      title: "Developer experience, out of the box",
      subtitle:
        "From scaffolding to conventions — skip repetitive infrastructure work.",
      items: {
        typescript: {
          title: "Strict TypeScript",
          description:
            "vue-tsc type checking and full inference — catch errors before build.",
        },
        autoImport: {
          title: "Auto-imports",
          description:
            "Vue, Pinia, VueUse, composables, and public components — zero imports.",
        },
        aiReady: {
          title: "AI-ready",
          description:
            "Claude Code / Cursor config with AGENTS.md and Skills built in.",
        },
        i18n: {
          title: "Internationalization",
          description:
            "vue-i18n Composition API with EN/ZH locales and type safety.",
        },
        lint: {
          title: "Lint & CI",
          description:
            "ESLint + Stylelint + Commitlint with Conventional Commits.",
        },
        deploy: {
          title: "One-command build",
          description:
            "Vite 7 production builds, multi-env .env, and dev proxy config.",
        },
      },
    },
    compare: {
      eyebrow: "compare",
      title: "Feature comparison",
      subtitle:
        "Save days of setup vs manual scaffolding or generic boilerplates.",
      featureCol: "Feature",
      columns: {
        template: "This template",
        manual: "Manual setup",
        generic: "Generic boilerplate",
      },
      rows: {
        typescript: "Strict TypeScript",
        autoImport: "Auto-imports",
        piniaPersist: "Pinia persistence",
        aiConfig: "AI tooling config",
        i18n: "i18n",
        lintCi: "Lint + Commitlint",
        darkReady: "Dark UI example",
      },
      values: {
        typescript: { template: "yes", manual: "partial", generic: "partial" },
        autoImport: { template: "yes", manual: "no", generic: "partial" },
        piniaPersist: { template: "yes", manual: "no", generic: "no" },
        aiConfig: { template: "yes", manual: "no", generic: "no" },
        i18n: { template: "yes", manual: "partial", generic: "no" },
        lintCi: { template: "yes", manual: "partial", generic: "partial" },
        darkReady: { template: "yes", manual: "no", generic: "no" },
      },
    },
    integrations: {
      eyebrow: "integrations",
      title: "Works with your stack",
      subtitle: "Integrates with the tools you already use every day.",
    },
    docsCta: {
      title: "Ready to dive into the docs?",
      subtitle:
        "Full API reference, folder conventions, and AI workflow guides — up and running in 5 minutes.",
      docsButton: "Open documentation",
      demoButton: "View demo",
    },
    footer: {
      tagline: "Built for developers who ship.",
      copyright: "© {year} Vue Element Template. MIT License.",
      docsLink: "Documentation",
    },
  },
};
