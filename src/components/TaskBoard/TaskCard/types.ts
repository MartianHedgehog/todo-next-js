import type { UniqueIdentifier } from "@dnd-kit/core";
import { ColumnId } from "@/components/TaskBoard/Board/types";

export interface TaskI {
  title: string;
  id: UniqueIdentifier;
  status: ColumnId;
  content: string;
  localId: string;
}

export interface TaskCardProps {
  task: TaskI;
  isOverlay?: boolean;
}

export type TaskT = "Task";

export interface TaskDragDataI {
  type: TaskT;
  task: TaskI;
}
