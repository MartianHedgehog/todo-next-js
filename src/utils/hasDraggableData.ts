import { Active, DataRef, Over } from "@dnd-kit/core";
import { ColumnDragDataI } from "@/components/TaskBoard/Column/types";
import { TaskDragDataI } from "@/components/TaskBoard/TaskCard/types";

type DraggableData = ColumnDragDataI | TaskDragDataI;

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  return data?.type === "Column" || data?.type === "Task";
}
