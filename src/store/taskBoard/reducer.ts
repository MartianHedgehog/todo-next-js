import { createAction, createReducer } from "@reduxjs/toolkit";
import { TaskI } from "@/components/TaskBoard/TaskCard/types";

const tasks = {} as Record<string, TaskI>;
interface TasksReducerI {
  isDraft: boolean;
  isFetching: boolean;
  isFailed: boolean;
  isLoading: boolean;
  tasks: Record<string, TaskI>;
}

const defaultState: TasksReducerI = {
  isDraft: false,
  isFetching: false,
  isFailed: false,
  isLoading: false,
  tasks,
};

const addTask = createAction<TaskI>("ADD_TASK");
const updateTask = createAction<TaskI>("UPDATE_TASK");
const fetchTasks = createAction<string>("FETCH_TASKS");
const fetchTasksSuccess = createAction("FETCH_TASKS_SUCCESS");
const fetchTasksFailed = createAction("FETCH_TASKS_FAILED");

export const taskBoardReducer = createReducer(defaultState, (builder) => {
  builder.addCase(addTask, (state, action) => {
    state.tasks[action.payload.id] = action.payload;
  });

  builder.addCase(updateTask, (state, action) => {
    state.tasks[action.payload.id] = action.payload;
  });
  builder.addCase(fetchTasks, (state) => {
    state.isLoading = true;
  });
  builder.addCase(fetchTasksSuccess, (state) => {
    state.isLoading = false;
  });
  builder.addCase(fetchTasksFailed, (state) => {
    state.isLoading = false;
    state.isFailed = true;
  });
});
