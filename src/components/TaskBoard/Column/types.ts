import { TaskI } from "@/components/TaskBoard/TaskCard/types";
import { TaskStatusT } from "@/components/TaskBoard/TaskBoardConfig";

export interface ColumnI {
  id: TaskStatusT;
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
