import { TASK_DEFAULT_STATUS } from "@/components/TaskBoard/TaskBoardConfig";
import { TaskI } from "@/components/TaskBoard/TaskCard/types";

export const DEFAULT_TASK = {
  content: "",
  status: TASK_DEFAULT_STATUS,
  title: "",
  id: "",
  localId: "test-1",
} satisfies TaskI;
