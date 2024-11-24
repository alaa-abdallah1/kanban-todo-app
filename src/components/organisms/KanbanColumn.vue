<template>
  <div
    :class="[
      'kanban-column kanban-column overflow-x-hidden h-full bg-white',
      {
        'hovered-column': isHovered,
        'overflow-hidden': !filteredTasks.length,
      },
    ]"
    :style="{
      borderColor: column.color,
    }"
    class="rounded border-4 transition-all space-y-2"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <h2
      class="text-lg font-bold sticky top-0 text-white p-2 gap-x-2 flex items-center justify-between"
      :style="{ backgroundColor: column?.color }"
    >
      <span>{{ column?.title }}</span>
      <AppButton
        variant="white"
        @click="toggleSortOrder"
        title="Sort by Priority"
      >
        <AppIcon name="sort" />
      </AppButton>
    </h2>
    <div v-if="filteredTasks.length" class="space-y-2 p-4">
      <div
        v-for="(task, index) in filteredTasks"
        :key="task.id"
        draggable="true"
        @dragstart="handleDragStart($event, task.id, index)"
        @dragover.prevent
        @dragenter="handleDragEnter(index)"
        @dragend="handleDragEnd"
        :class="[
          'task-card p-4 rounded shadow-md border-l-4 transition-all',
          taskClass(task),
        ]"
      >
        <h3 class="text-sm font-bold truncate" :title="task.title">
          {{ task.title }}
        </h3>
        <p class="text-xs line-clamp-3 text-gray-600" :title="task.description">
          {{ task.description }}
        </p>
        <p class="text-xs text-gray-500 mt-2">
          Priority: {{ task.priority }} - Due:
          {{ task.dueDate || "No due date" }}
        </p>
        <p
          v-if="task.isOverdue"
          class="text-red-500 text-xs font-semibold mt-1"
        >
          Overdue!
        </p>
        <div class="flex justify-end space-x-2 mt-4">
          <AppButton
            size="small"
            variant="primary"
            @click="$emit('edit-task', task)"
          >
            <AppIcon name="edit" />
          </AppButton>
          <AppButton
            size="small"
            variant="danger"
            @click="$emit('delete-task', task.id)"
          >
            <AppIcon name="delete" />
          </AppButton>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex justify-center text-gray-500 font-semibold items-center text-center h-full"
    >
      No tasks found.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineProps } from "vue";
import { useStore } from "vuex";
import { AppButton, AppIcon } from "@/components";
import { IKanbanColumn, Task, TaskStatus } from "@/types";

const props = defineProps<IKanbanColumn>();

const store = useStore();
const isHovered = ref(false);
const draggedTaskId = ref<string>();
const draggedTaskIndex = ref<number>();
const draggedFromColumn = ref<TaskStatus>();
const isSortAscending = ref(true);

const filteredTasks = computed<Task[]>(() =>
  store.state.tasks.filter(
    (task: Task) =>
      task.status === props.column.status &&
      (props.searchQuery
        ? task.title.toLowerCase().includes(props.searchQuery?.toLowerCase()) ||
          task.description
            .toLowerCase()
            .includes(props.searchQuery?.toLowerCase())
        : true)
  )
);

const toggleSortOrder = () => {
  isSortAscending.value = !isSortAscending.value;

  const priorityOrder = isSortAscending.value
    ? ["low", "medium", "high"]
    : ["high", "medium", "low"];

  store.commit("updateTasks", {
    status: props.column.status,
    tasks: [...filteredTasks.value].sort(
      (a, b) =>
        priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
    ),
  });

  store.dispatch("saveTasks");
};

const handleDragStart = (event: DragEvent, taskId: string, index: number) => {
  draggedTaskId.value = taskId;
  draggedTaskIndex.value = index;
  draggedFromColumn.value = props.column.status;

  event.dataTransfer?.setData("text/plain", taskId);

  // Ensure setDragImage works by using a fallback element if target is invalid
  const dragImage = event.target as HTMLElement;
  dragImage.style.visibility = "hidden"; // Ensure fallback is invisible
  event.dataTransfer?.setDragImage(dragImage, 0, 0);
};

const handleDragEnter = (targetIndex: number) => {
  if (draggedFromColumn.value !== props.column.status) return;

  if (
    draggedTaskIndex.value === undefined ||
    draggedTaskIndex.value === targetIndex
  )
    return;

  const reorderedTasks = [...filteredTasks.value];
  const [movedTask] = reorderedTasks.splice(draggedTaskIndex.value, 1);
  reorderedTasks.splice(targetIndex, 0, movedTask);

  store.commit("reorderTasks", {
    columnStatus: props.column.status,
    newOrder: reorderedTasks,
  });
  draggedTaskIndex.value = targetIndex;
};

const handleDragOver = () => {
  isHovered.value = true;
};

const handleDragLeave = () => {
  isHovered.value = false;
};

const handleDrop = (event: DragEvent) => {
  const taskId = event.dataTransfer?.getData("text/plain");
  if (!taskId) return;

  if (draggedFromColumn.value !== props.column.status) {
    store.commit("updateTaskStatus", {
      taskId,
      status: props.column.status,
    });
  }

  store.dispatch("saveTasks");
  isHovered.value = false;
};

const handleDragEnd = (event: DragEvent) => {
  draggedTaskId.value = "";
  draggedTaskIndex.value = undefined;
  draggedFromColumn.value = undefined;

  const dragImage = event.target as HTMLElement;
  dragImage.style.visibility = ""; // Ensure fallback is visible
};

const taskClass = (task: Task) => {
  const priorities = {
    low: "bg-green-50 border-green-400",
    medium: "bg-yellow-50 border-yellow-400",
    high: "bg-red-50 border-red-400",
  };
  return task.isOverdue
    ? "bg-red-100 border-red-500"
    : priorities[task.priority] || priorities.low;
};
</script>

<style scoped>
.hovered-column {
  @apply bg-gray-100 border-dashed border-gray-400;
  transition: background-color 0.3s, border-color 0.3s;
}

.task-card {
  @apply shadow-md p-4 rounded-lg transition-all;
  &:hover {
    @apply bg-gray-50;
  }
}

.truncate {
  @apply overflow-hidden whitespace-nowrap text-ellipsis;
}

/* Scrollbar customization */
.kanban-column::-webkit-scrollbar {
  width: 10px; /* Adjust the width of the scrollbar */
}

.kanban-column::-webkit-scrollbar-thumb {
  background-color: #cbd5e1; /* Color of the scrollbar thumb */
  border-radius: 5px; /* Rounded edges for the scrollbar thumb */
  border: 2px solid transparent; /* Adds a gap between the thumb and track */
  background-clip: padding-box; /* Prevent thumb color from overflowing */
}

.kanban-column::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8; /* Darker thumb color on hover */
}

.kanban-column::-webkit-scrollbar-track {
  background-color: #f8fafc; /* Color of the scrollbar track */
  border-radius: 5px;
}

/* Firefox scrollbar customization */
.kanban-column {
  scrollbar-width: thin; /* Thin scrollbar */
  scrollbar-color: #cbd5e1 #f8fafc; /* Thumb and track colors */
}
</style>
