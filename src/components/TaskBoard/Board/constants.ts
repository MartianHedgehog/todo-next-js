import { TASK_STATUSES } from "@/components/TaskBoard/TaskBoardConfig";
import { ColumnI } from "@/components/TaskBoard/Column/types";

// export const DEFAULT_COLUMNS = [
//   {
//     status: "todo" as const,
//     title: "Todo",
//   },
//   {
//     status: "in-progress" as const,
//     title: "In progress",
//   },
//   {
//     status: "done" as const,
//     title: "Done",
//   },
// ] satisfies ColumnI[];

export const DEFAULT_COLUMNS = TASK_STATUSES.map((taskStatus) => ({
  status: taskStatus,
  title: taskStatus.charAt(0).toUpperCase() + taskStatus.slice(1),
})) satisfies ColumnI[];
