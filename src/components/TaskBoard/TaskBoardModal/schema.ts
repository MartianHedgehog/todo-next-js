import { z } from "zod";
import { TASK_STATUSES } from "@/components/TaskBoard/TaskBoardConfig";

export const NewTaskSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().max(500),
  status: z.enum(TASK_STATUSES),
});
