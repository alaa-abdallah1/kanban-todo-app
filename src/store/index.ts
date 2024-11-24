import { createStore } from "vuex";
import { Task, TaskStatus } from "@/types";

export default createStore({
  state: {
    tasks: [] as Task[],
  },
  mutations: {
    setTasks(state, tasks: Task[]) {
      state.tasks = tasks;
    },
    addTask(state, task: Task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask: Task) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask(state, taskId: string) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    updateTasks(state, { status, tasks }) {
      state.tasks = state.tasks
        .filter(task => task.status !== status)
        .concat(tasks);
    },
    updateTaskStatus(
      state,
      { taskId, status }: { taskId: string; status: TaskStatus }
    ) {
      const task = state.tasks.find(task => String(task.id) === String(taskId));
      if (task) {
        task.status = status as TaskStatus;
      }
    },
    reorderTasks(
      state,
      { columnStatus, newOrder }: { columnStatus: string; newOrder: Task[] }
    ) {
      // Update tasks order for the given column
      const otherTasks = state.tasks.filter(
        task => task.status !== columnStatus
      );
      state.tasks = [...otherTasks, ...newOrder];
    },
  },
  actions: {
    saveTasks({ state }) {
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    loadTasks({ commit }) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      commit("setTasks", tasks);
    },
  },
});
