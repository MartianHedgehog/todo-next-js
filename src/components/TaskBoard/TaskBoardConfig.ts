export const TASK_STATUSES = ["todo", "in-progress", "done"] as const;

export type TaskStatusT = (typeof TASK_STATUSES)[number];

export const TASK_DEFAULT_STATUS = "todo" as const;
