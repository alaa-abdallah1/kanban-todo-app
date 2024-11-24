<template>
  <AppModal :visible="visible">
    <h2 class="text-lg font-bold mb-4">
      {{ isEditing ? "Edit Task" : "Create New Task" }}
    </h2>
    <AppTaskForm :task="taskToEdit" @submit="submitTask" @cancel="closeModal" />
  </AppModal>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { Task } from "@/types";
import { AppModal } from "../atoms";
import { AppTaskForm } from "../organisms";

const { taskToEdit, visible } = defineProps<{
  taskToEdit: Task | null;
  visible: boolean;
}>();

const emit = defineEmits(["close"]);

const store = useStore();

const isEditing = computed(() => !!taskToEdit);

const submitTask = (payload: Task) => {
  if (isEditing.value) {
    store.commit("updateTask", payload);
  } else {
    payload.id = String(Date.now());
    store.commit("addTask", payload);
  }

  store.dispatch("saveTasks");
  closeModal();
};

const closeModal = () => emit("close");
</script>
