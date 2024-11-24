<template>
  <div class="max-w-7xl mx-auto p-4">
    <div class="h-[calc(100vh-64px)] flex flex-col gap-6">
      <div
        class="flex justify-between flex-col-reverse md:flex-row gap-4 items-center"
      >
        <AppTextInput
          v-model="searchInputValue"
          @update:model-value="applyDebouncedSearch"
          placeholder="Search tasks..."
          class="w-full"
        />

        <AppButton
          size="medium"
          class="w-full md:max-w-max"
          @click="openTaskCreationModal"
          >Create Task</AppButton
        >
      </div>
      <div class="flex-1 w-full overflow-x-auto overflow-y-hidden">
        <div class="grid min-w-max lg:min-w-fit grid-cols-4 gap-4 h-full">
          <AppkanbanColumn
            v-for="column in kanbanColumns"
            :key="column.id"
            :column="column"
            :search-query="searchQuery"
            @edit-task="openTaskEditModal"
            @delete-task="removeTask"
          />
        </div>
      </div>

      <TaskCreationModal
        :visible="isModalVisible"
        :task-to-edit="taskBeingEdited"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";
import TaskCreationModal from "./TaskCreationModal.vue";
import { AppkanbanColumn } from "../organisms";
import { AppTextInput } from "../molecules";
import { AppButton } from "../atoms";
import { IColumn, TaskStatus } from "@/types";

const store = useStore();

const isModalVisible = ref(false);
const taskBeingEdited = ref(null);
const searchInputValue = ref("");
const searchQuery = ref("");
const debounceTimer = ref<number | null>(null);

const kanbanColumns: IColumn[] = [
  { id: 1, title: "Todo", status: TaskStatus.Todo, color: "#F87171" },
  {
    id: 2,
    title: "In Progress",
    status: TaskStatus.InProgress,
    color: "#60A5FA",
  },
  { id: 3, title: "In Review", status: TaskStatus.InReview, color: "#FACC15" },
  { id: 4, title: "Done", status: TaskStatus.Done, color: "#34D399" },
];

const openTaskCreationModal = () => {
  taskBeingEdited.value = null;
  isModalVisible.value = true;
};

const openTaskEditModal = (task: any) => {
  taskBeingEdited.value = task;
  isModalVisible.value = true;
};

const removeTask = (taskId: number) => {
  if (confirm("Are you sure you want to delete this task?")) {
    store.commit("deleteTask", taskId);
    store.dispatch("saveTasks");
  }
};

const closeModal = () => {
  isModalVisible.value = false;
};

const applyDebouncedSearch = () => {
  if (debounceTimer.value) clearTimeout(debounceTimer.value as number);
  debounceTimer.value = setTimeout(() => {
    searchQuery.value = searchInputValue.value;
  }, 300) as unknown as number;
};
</script>
