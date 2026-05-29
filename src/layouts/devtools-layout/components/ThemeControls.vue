<script setup lang="ts">
const { t } = useI18n();
const { isDark, setMode } = useThemeMode();
const { primaryColor, presetColors, setPrimaryColor } = useThemeColor();

const onColorChange = (value: string | null) => {
  if (value) {
    setPrimaryColor(value);
  }
};
</script>

<template>
  <div class="theme-controls flex items-center gap-1">
    <el-popover placement="bottom-end" :width="232" trigger="click">
      <template #reference>
        <button
          type="button"
          class="theme-controls__btn"
          :title="t('devtools.nav.themeColor')"
          :aria-label="t('devtools.nav.themeColor')"
        >
          <el-icon :size="16"><Brush /></el-icon>
          <span
            class="theme-controls__swatch"
            :style="{ backgroundColor: primaryColor }"
          />
        </button>
      </template>
      <p class="theme-controls__label">
        {{ t("devtools.nav.themeColorPresets") }}
      </p>
      <div class="theme-controls__presets" role="list">
        <button
          v-for="preset in presetColors"
          :key="preset.name"
          type="button"
          role="listitem"
          class="theme-controls__preset"
          :class="{
            'theme-controls__preset--active': preset.value === primaryColor,
          }"
          :style="{ backgroundColor: preset.value }"
          :aria-label="preset.name"
          :title="preset.name"
          @click="setPrimaryColor(preset.value)"
        />
      </div>
      <div class="theme-controls__picker-row">
        <span class="theme-controls__label">{{
          t("devtools.nav.themeColorCustom")
        }}</span>
        <el-color-picker
          :model-value="primaryColor"
          size="small"
          @change="onColorChange"
        />
      </div>
    </el-popover>

    <button
      type="button"
      class="theme-controls__btn"
      :aria-label="
        isDark
          ? t('devtools.nav.themeModeLight')
          : t('devtools.nav.themeModeDark')
      "
      @click="setMode(isDark ? 'light' : 'dark')"
    >
      <el-icon :size="16">
        <Sunny v-if="isDark" />
        <Moon v-else />
      </el-icon>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.theme-controls__btn {
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: 8px;
  background: transparent;
  padding: 6px 8px;
  color: #94a3b8;
  transition:
    color 0.2s,
    background-color 0.2s;

  &:hover {
    background-color: rgb(51 65 85 / 50%);
    color: #f8fafc;
  }
}

.theme-controls__swatch {
  width: 14px;
  height: 14px;
  border: 1px solid rgb(248 250 252 / 30%);
  border-radius: 4px;
}

.theme-controls__label {
  margin: 0 0 8px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.theme-controls__presets {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.theme-controls__preset {
  width: 28px;
  height: 28px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 0;
  transition:
    transform 0.15s,
    border-color 0.15s;

  &:hover {
    transform: scale(1.08);
  }

  &--active {
    border-color: #f8fafc;
    box-shadow: 0 0 0 1px #334155;
  }
}

.theme-controls__picker-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-top: 1px solid var(--el-border-color-light);
  padding-top: 12px;

  .theme-controls__label {
    margin: 0;
  }
}
</style>
