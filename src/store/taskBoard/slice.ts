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
    addTask: (state: BoardStateI, action: PayloadAction<TaskI>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state: BoardStateI, action: PayloadAction<TaskI>) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      state.tasks[taskIndex] = action.payload;
    },
    setTasks: (state: BoardStateI, action: PayloadAction<TaskI[]>) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoBoard.pending.type, (state: BoardStateI) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchTodoBoard.fulfilled.type,
      (state: BoardStateI, action: PayloadAction<TaskI[]>) => {
        state.isLoading = false;
        state.tasks = action.payload;
      }
    );
    builder.addCase(fetchTodoBoard.rejected.type, (state: BoardStateI) => {
      state.isLoading = false;
      state.isFailed = true;
    });

    builder.addCase(postTodoBoard.pending.type, (state: BoardStateI) => {
      state.isLoading = true;
    });

    builder.addCase(postTodoBoard.fulfilled.type, (state: BoardStateI) => {
      state.isLoading = false;
    });

    builder.addCase(postTodoBoard.rejected.type, (state: BoardStateI) => {
      state.isLoading = false;
      state.isFailed = true;
    });
  },
});

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

export const { addTask, editTask, setTasks } = todoBoardSlice.actions;
export const getTasks = (state: RootState) => state.taskBoard.tasks;

export const { reducer: todoBoardSliceReducer } = todoBoardSlice;
