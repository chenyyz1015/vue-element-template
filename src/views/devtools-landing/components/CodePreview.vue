<script setup lang="ts">
import type { CodeTabKey } from "../constants";
import { CODE_TAB_KEYS } from "../constants";

const { t } = useI18n();
const activeTab = ref<CodeTabKey>("cli");

const tabs = computed(() =>
  CODE_TAB_KEYS.map((key) => ({
    key,
    label: t(`devtools.code.tabs.${key}`),
  }))
);
</script>

<template>
  <div class="code-preview">
    <div class="code-preview__chrome">
      <span
        class="code-preview__dot code-preview__dot--close"
        aria-hidden="true"
      />
      <span
        class="code-preview__dot code-preview__dot--minimize"
        aria-hidden="true"
      />
      <span
        class="code-preview__dot code-preview__dot--maximize"
        aria-hidden="true"
      />
      <span class="code-preview__filename">
        {{ t(`devtools.code.filename.${activeTab}`) }}
      </span>
    </div>

    <div class="code-preview__tabs" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        role="tab"
        class="code-preview__tab"
        :class="{
          'code-preview__tab--active': activeTab === tab.key,
        }"
        :aria-selected="activeTab === tab.key"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <pre class="code-preview__body" aria-label="Code preview"><code
        v-if="activeTab === 'cli'"
      ><span class="syn-comment"># {{ t('devtools.code.cli.comment') }}</span>
<span class="syn-builtin">npm</span> <span class="syn-property">create</span> <span class="syn-string">vue-element-template</span> <span class="syn-property">my-app</span>
<span class="syn-builtin">cd</span> <span class="syn-property">my-app</span>
<span class="syn-builtin">npm</span> <span class="syn-property">install</span>
<span class="syn-builtin">npm</span> <span class="syn-property">run</span> <span class="syn-string">dev</span></code><code v-else-if="activeTab === 'config'"><span class="syn-comment">// vite.config.ts</span>
<span class="syn-keyword">import</span> <span class="syn-punctuation">&#123;</span> <span class="syn-property">defineConfig</span> <span class="syn-punctuation">&#125;</span> <span class="syn-keyword">from</span> <span class="syn-string">'vite'</span>
<span class="syn-keyword">import</span> <span class="syn-property">vue</span> <span class="syn-keyword">from</span> <span class="syn-string">'@vitejs/plugin-vue'</span>

<span class="syn-keyword">export default</span> <span class="syn-function">defineConfig</span><span class="syn-punctuation">(</span><span class="syn-punctuation">&#123;</span>
  <span class="syn-property">plugins</span><span class="syn-punctuation">:</span> <span class="syn-punctuation">[</span><span class="syn-function">vue</span><span class="syn-punctuation">(</span><span class="syn-punctuation">)</span><span class="syn-punctuation">]</span><span class="syn-punctuation">,</span>
  <span class="syn-property">resolve</span><span class="syn-punctuation">:</span> <span class="syn-punctuation">&#123;</span> <span class="syn-property">alias</span><span class="syn-punctuation">:</span> <span class="syn-punctuation">&#123;</span> <span class="syn-string">'@/'</span><span class="syn-punctuation">:</span> <span class="syn-string">'/src'</span> <span class="syn-punctuation">&#125;</span> <span class="syn-punctuation">&#125;</span><span class="syn-punctuation">,</span>
<span class="syn-punctuation">&#125;</span><span class="syn-punctuation">)</span></code><code v-else><span class="syn-comment">// src/views/home/index.vue</span>
<span class="syn-keyword">const</span> <span class="syn-punctuation">&#123;</span> <span class="syn-property">t</span> <span class="syn-punctuation">&#125;</span> <span class="syn-operator">=</span> <span class="syn-function">useI18n</span><span class="syn-punctuation">(</span><span class="syn-punctuation">)</span>

<span class="syn-keyword">onMounted</span><span class="syn-punctuation">(</span><span class="syn-punctuation">(</span><span class="syn-punctuation">)</span> <span class="syn-operator">=&gt;</span> <span class="syn-punctuation">&#123;</span>
  <span class="syn-property">ElMessage</span><span class="syn-punctuation">.</span><span class="syn-function">success</span><span class="syn-punctuation">(</span><span class="syn-function">t</span><span class="syn-punctuation">(</span><span class="syn-string">'home.startupSuccess'</span><span class="syn-punctuation">)</span><span class="syn-punctuation">)</span>
<span class="syn-punctuation">&#125;</span><span class="syn-punctuation">)</span></code></pre>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/mixins" as *;

.code-preview {
  @apply overflow-hidden rounded-xl border shadow-2xl;

  border-color: $dl-border;
  background-color: $dl-surface;

  &__chrome {
    @apply flex items-center gap-2 border-b px-4 py-3;

    border-color: $dl-border;
    background-color: $dl-bg;
  }

  &__dot {
    @apply h-3 w-3 rounded-full;

    &--close {
      background-color: #ff5f57;
    }

    &--minimize {
      background-color: #ffbd2e;
    }

    &--maximize {
      background-color: #28ca42;
    }
  }

  &__filename {
    @apply ml-2 text-xs font-mono;

    color: $dl-text-dim;
  }

  &__tabs {
    @apply flex flex-wrap gap-1 border-b px-2 py-2;

    border-color: $dl-border;
  }

  &__tab {
    @apply cursor-pointer rounded-md border-none px-3 py-1.5 text-xs font-mono transition-colors duration-200;

    background-color: transparent;
    color: $dl-text-muted;

    &:hover {
      @apply bg-[#334155]/50;

      color: $dl-text;
    }

    &--active {
      @apply bg-[#334155];

      color: $dl-accent;
    }
  }

  &__body {
    @apply overflow-x-auto p-4 text-sm leading-relaxed font-mono;
  }
}
</style>
