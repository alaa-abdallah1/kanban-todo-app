import { TaskStatus } from "./task";

export interface IColumn {
  id: number;
  title: string;
  status: TaskStatus;
  color: string;
}

export interface IKanbanColumn {
  column: IColumn;
  searchQuery?: String;
}
