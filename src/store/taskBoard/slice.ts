import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/store/createSliceApp";
import { TaskI } from "@/components/TaskBoard/TaskCard/types";
import { MOCK_INITIAL_TASKS } from "@/components/TaskBoard/Board/mockData";
import { RootState } from "@/store/store";

interface BoardStateI {
  tasks: TaskI[];
  isFetching: boolean;
  isFailed: boolean;
  isLoading: boolean;
}

const boardState: BoardStateI = {
  tasks: [],
  isFetching: false,
  isFailed: false,
  isLoading: false,
};

const todoBoardSlice = createAppSlice({
  name: "todoBoard",
  initialState: boardState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskI[]>) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoBoard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchTodoBoard.fulfilled,
      (state, action: PayloadAction<TaskI[]>) => {
        state.isLoading = false;
        state.tasks = action.payload;
      }
    );
    builder.addCase(fetchTodoBoard.rejected, (state) => {
      state.isLoading = false;
      state.isFailed = true;
    });

    builder.addCase(postTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      postTask.fulfilled,
      (state, action: PayloadAction<TaskI>) => {
        state.isLoading = false;
        state.tasks.unshift(action.payload);
      }
    );
    builder.addCase(postTask.rejected, (state) => {
      state.isLoading = false;
      state.isFailed = true;
    });

    builder.addCase(editTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      editTask.fulfilled,
      (state, action: PayloadAction<TaskI>) => {
        state.isLoading = false;
        const taskIndex = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = action.payload;
        }
      }
    );
    builder.addCase(editTask.rejected, (state) => {
      state.isLoading = false;
      state.isFailed = true;
    });
  },
});

export const editTask = createAsyncThunk<TaskI, TaskI>(
  "todoBoard/editTask",
  async (task, thunkAPI) => {
    try {
      return await new Promise<TaskI>((resolve) => {
        setTimeout(() => {
          resolve(task);
        }, 1000);
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchTodoBoard = createAsyncThunk<TaskI[], string>(
  "todoBoard/fetchTodoBoard",
  async (id, thunkAPI) => {
    try {
      return await new Promise<TaskI[]>((resolve) => {
        setTimeout(() => {
          resolve(MOCK_INITIAL_TASKS);
        }, 1000);
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postTask = createAsyncThunk<TaskI, TaskI>(
  "todoBoard/postTask",
  async (task, thunkAPI) => {
    try {
      return await new Promise<TaskI>((resolve) => {
        setTimeout(() => {
          resolve(task);
        }, 1000);
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postTodoBoard = createAsyncThunk<void, TaskI[]>(
  "todoBoard/postTodoBoard",
  async (tasks, thunkAPI) => {
    try {
      return await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const { setTasks } = todoBoardSlice.actions;
export const getTasks = (state: RootState) => state.taskBoard.tasks;

export const { reducer: todoBoardSliceReducer } = todoBoardSlice;
