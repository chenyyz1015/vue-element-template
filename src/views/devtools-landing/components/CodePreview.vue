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
  <div
    class="overflow-hidden border border-[#334155] rounded-xl bg-[#1E293B] shadow-2xl"
  >
    <div
      class="flex items-center gap-2 border-b border-[#334155] bg-[#0F172A] px-4 py-3"
    >
      <span class="h-3 w-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
      <span class="h-3 w-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
      <span class="h-3 w-3 rounded-full bg-[#28CA42]" aria-hidden="true" />
      <span class="ml-2 text-xs text-[#64748B] font-mono">
        {{ t(`devtools.code.filename.${activeTab}`) }}
      </span>
    </div>

    <div class="flex flex-wrap gap-1 border-b border-[#334155] px-2 py-2">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="cursor-pointer rounded-md border-none px-3 py-1.5 text-xs font-mono transition-colors duration-200"
        :class="
          activeTab === tab.key
            ? 'bg-[#334155] text-[#22C55E]'
            : 'bg-transparent text-[#94A3B8] hover:bg-[#334155]/50 hover:text-[#F8FAFC]'
        "
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <pre
      class="overflow-x-auto p-4 text-sm leading-relaxed font-mono"
      aria-label="Code preview"
    ><code v-if="activeTab === 'cli'"><span class="syn-comment"># {{ t('devtools.code.cli.comment') }}</span>
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

<style lang="scss" scoped></style>
