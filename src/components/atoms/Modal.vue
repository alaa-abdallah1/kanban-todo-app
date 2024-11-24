<template>
  <div
    class="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    v-if="visible"
  >
    <div class="bg-white p-3 shadow-md w-96 rounded-xl overflow-hidden mx-3">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ visible: boolean }>();
</script>
