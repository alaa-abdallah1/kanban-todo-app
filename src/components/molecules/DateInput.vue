<template>
  <AppFormFieldWrapper :id="id" :label="label" :error="error">
    <input
      :id="id"
      type="date"
      :value="modelValue"
      @input="onInput"
      :class="['w-full rounded-lg border p-2', { 'border-red-500': error }]"
      :min="min"
      :required="required"
    />
  </AppFormFieldWrapper>
</template>

<script lang="ts" setup>
import { AppFormFieldWrapper } from "../atoms";

defineProps<{
  id: string;
  label: string;
  modelValue: string;
  min?: string;
  required?: boolean;
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
