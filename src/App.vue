<template>
  <div class="app">
    <KanbanBoard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KanbanBoard from "@/components/templates/KanbanBoard.vue";

export default defineComponent({
  name: "App",
  components: { KanbanBoard },
});
</script>
