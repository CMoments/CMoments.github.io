import { configureStore } from '@reduxjs/toolkit';
import ganttReducer from './ganttSlice';

export const store = configureStore({
  reducer: {
    gantt: ganttReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;