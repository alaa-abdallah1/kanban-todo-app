<template>
  <AppFormFieldWrapper :id="id" :label="label" :error="error">
    <textarea
      :id="id"
      :value="modelValue"
      @input="onInput"
      :class="['w-full rounded-lg border p-2', { 'border-red-500': error }]"
      :placeholder="placeholder"
      :required="required"
    ></textarea>
  </AppFormFieldWrapper>
</template>

<script lang="ts" setup>
import { AppFormFieldWrapper } from "../atoms";

defineProps<{
  id: string;
  label: string;
  modelValue: string;
  placeholder?: string;
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
