import type { UniqueIdentifier } from "@dnd-kit/core";
import { TaskI } from "@/components/TaskBoard/TaskCard/types";

export interface ColumnI {
  id: UniqueIdentifier;
  title: string;
}

export type ColumnTypeT = "Column";

export interface ColumnDragDataI {
  type: ColumnTypeT;
  column: ColumnI;
}

export interface BoardColumnProps {
  column: ColumnI;
  tasks: TaskI[];
  isOverlay?: boolean;
}
