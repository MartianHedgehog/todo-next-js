import type { Column } from "@/components/TaskBoard/Column";

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
] satisfies Column[];

export const COLLUMNS_ID = DEFAULT_COLUMNS.map((col) => col.id);
