<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block font-medium text-sm capitalize mb-1"
      >{{ label }} <span v-if="required" class="text-red-500">*</span></label
    >

    <slot />

    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  id?: string;
  label?: string;
  error?: string;
  required?: boolean;
}>();
</script>
