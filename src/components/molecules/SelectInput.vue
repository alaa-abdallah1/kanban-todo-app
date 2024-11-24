<template>
  <AppFormFieldWrapper :id="id" :label="label" :error="error">
    <select
      :id="id"
      :value="modelValue"
      @input="onInput"
      :class="[
        'w-full rounded-lg border p-2 capitalize',
        { 'border-red-500': error },
      ]"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </AppFormFieldWrapper>
</template>

<script lang="ts" setup>
import { AppFormFieldWrapper } from "../atoms";

defineProps<{
  id: string;
  label: string;
  modelValue: string;
  options: { value: string; label: string }[];
  error?: string;
}>();

const $emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  $emit("update:modelValue", target.value || null);
};
</script>
