<template>
  <button
    :class="buttonClass"
    :type="type || 'button'"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { IButton } from "@/types";

// Props
const props = withDefaults(defineProps<IButton>(), {
  variant: "primary",
  type: "button",
  size: "medium",
});

// Emit click event
defineEmits(["click"]);

// Computed class for button
const buttonClass = computed(() => {
  const baseClass = "button";
  const variantClass = `button-${props.variant}`;
  const sizeClass = `button-${props.size}`;
  return `${baseClass} ${
    props.disabled ? "button-disabled" : variantClass
  } ${sizeClass}`;
});
</script>

<style scoped lang="scss">
.button {
  @apply rounded-lg font-medium focus:outline-none focus:ring-2 transition-all;

  // Sizes
  &-small {
    @apply px-2 py-1 text-sm;
  }

  &-medium {
    @apply px-4 py-2 text-base;
  }

  &-large {
    @apply px-6 py-3 text-lg;
  }

  // Variants
  &-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400;
  }

  &-white {
    @apply bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-400 border;
  }

  &-success {
    @apply bg-green-500 text-white hover:bg-green-600 focus:ring-green-400;
  }

  &-danger {
    @apply bg-red-500 text-white hover:bg-red-600 focus:ring-red-400;
  }

  &-warning {
    @apply bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400;
  }

  // Disabled state
  &-disabled {
    @apply bg-gray-300 text-gray-700 cursor-not-allowed pointer-events-none;
  }
}
</style>
