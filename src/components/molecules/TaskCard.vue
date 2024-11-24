<template>
  <div
    class="task-card p-4 rounded shadow-md border-l-4 transition-all"
    :class="taskClass"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    <h3 class="text-sm font-bold truncate" :title="task.title">
      {{ task.title }}
    </h3>
    <p class="text-xs truncate text-gray-600" :title="task.description">
      {{ task.description }}
    </p>
    <p class="text-xs text-gray-500 mt-2">
      Priority: {{ task.priority }} - Due: {{ task.dueDate || "No due date" }}
    </p>
    <p v-if="task.isOverdue" class="text-red-500 text-xs font-semibold mt-1">
      Overdue!
    </p>
    <div class="flex justify-end space-x-2 mt-4">
      <AppButton size="small" variant="primary" @click="editTask">
        <AppIcon name="edit" />
      </AppButton>
      <AppButton size="small" variant="danger" @click="deleteTask">
        <AppIcon name="delete" />
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Task } from "@/types";
import { AppButton } from "../atoms";

const props = defineProps<{ task: Task }>();

const emit = defineEmits([
  "edit-task",
  "delete-task",
  "drag-start",
  "drag-end",
]);

const taskClass = computed(() => {
  const priorities = {
    low: "bg-green-50 border-green-400",
    medium: "bg-yellow-50 border-yellow-400",
    high: "bg-red-50 border-red-400",
  };
  return props.task?.isOverdue
    ? "bg-red-100 border-red-500"
    : priorities[props.task?.priority] || priorities.low;
});

const onDragStart = (event: DragEvent) => {
  emit("drag-start", props.task?.id);
  event.dataTransfer?.setData("text/plain", props.task?.id);
};

const onDragEnd = () => {
  emit("drag-end");
};

const editTask = () => emit("edit-task", props.task);
const deleteTask = () => emit("delete-task", props.task?.id);
</script>

<style scoped>
.task-card {
  @apply shadow-md p-4 rounded-lg transition-all;
  &:hover {
    @apply bg-gray-50;
  }
}

.truncate {
  @apply overflow-hidden whitespace-nowrap text-ellipsis;
}
</style>
