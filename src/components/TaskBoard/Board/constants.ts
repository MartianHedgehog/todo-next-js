import type { ColumnI } from "@/components/TaskBoard/Column/types";

export const DEFAULT_COLUMNS = [
  {
    id: "todo" as const,
    title: "Todo",
  },
  {
    id: "in-progress" as const,
    title: "In progress",
  },
  {
    id: "done" as const,
    title: "Done",
  },
] satisfies ColumnI[];

export const COLUMNS_ID = DEFAULT_COLUMNS.map((col) => col.id);
