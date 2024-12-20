import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { todoBoardSliceReducer } from "@/store/taskBoard/slice";

export const makeStore = () => {
  return configureStore({
    reducer: { taskBoard: todoBoardSliceReducer },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

// Infer the `AppDispatch` type from the store `dispatch` method
export type AppDispatch = AppStore["dispatch"];

// Infer the `AppSelector` type from the store `getState` method
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
