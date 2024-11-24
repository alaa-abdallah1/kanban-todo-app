<template>
  <form class="space-y-6" @submit.prevent="submitTask">
    <AppTextInput
      id="task-title"
      label="Title"
      v-model="localTask.title"
      :error="errors.title"
      placeholder="Enter task title"
    />

    <AppTextareaInput
      id="task-description"
      label="Description"
      v-model="localTask.description"
      :error="errors.description"
      placeholder="Enter task description"
    />

    <AppSelectInput
      id="task-priority"
      label="Priority"
      v-model="localTask.priority"
      :options="priorityOptions"
    />

    <AppDateInput
      id="task-due-date"
      label="Due Date"
      v-model="localTask.dueDate"
      :min="minDate"
      :error="errors.dueDate"
    />

    <div class="flex justify-end space-x-4">
      <AppButton variant="white" @click="cancelTask">Cancel</AppButton>
      <AppButton type="submit">{{
        isEditing ? "Update Task" : "Create Task"
      }}</AppButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, computed, watch, ref } from "vue";
import {
  AppTextInput,
  AppTextareaInput,
  AppSelectInput,
  AppDateInput,
} from "../molecules";
import { AppButton } from "../atoms";
import { Task, TaskPriority, TaskStatus } from "@/types";

// Default Task Data
const defaultTask = {
  id: "",
  title: "",
  description: "",
  priority: TaskPriority.Low,
  dueDate: "",
  status: TaskStatus.Todo,
  isOverdue: false,
};

const { task } = defineProps<{
  task: Task | null;
}>();

const emit = defineEmits(["submit", "cancel"]);

const localTask = reactive({ ...defaultTask });
const errors = reactive<Record<string, string>>({
  title: "",
  description: "",
  dueDate: "",
});

// Computed and Watchers
const isEditing = computed(() => !!task?.id);

const priorityOptions = computed(() =>
  Object.values(TaskPriority).map(p => ({ label: p, value: p }))
);

const minDate = computed(() => new Date().toISOString().split("T")[0]);

watch(
  () => task,
  newTask => {
    if (newTask) {
      Object.assign(localTask, newTask);
    } else {
      Object.assign(localTask, defaultTask);
    }
  },
  { immediate: true }
);

const hasValidationErrors = () => {
  errors.title = !localTask.title?.trim() ? "Title is required." : "";
  errors.description = !localTask.description?.trim()
    ? "Description is required."
    : "";
  errors.dueDate = !localTask.dueDate ? "Due date is required." : "";

  return Object.values(errors).some((error: string) => error.length > 0);
};

// Form Handlers
const submitTask = () => {
  if (hasValidationErrors()) return;

  emit("submit", { ...localTask });
};

const cancelTask = () => {
  emit("cancel");
};
</script>
