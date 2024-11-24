<template>
  <div class="homepage">
    <KanbanBoard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KanbanBoard from "../components/templates/KanbanBoard.vue";

export default defineComponent({
  name: "HomePage",
  components: { KanbanBoard },
});
</script>
