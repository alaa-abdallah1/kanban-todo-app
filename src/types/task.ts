export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export enum TaskStatus {
  Todo = "todo",
  InProgress = "in-progress",
  InReview = "in-review",
  Done = "done",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  isOverdue: boolean;
}
