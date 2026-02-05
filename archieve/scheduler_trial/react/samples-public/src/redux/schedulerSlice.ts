import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { seedEvents, seedDate, seedView } from "../common/Seed";
import { createEvent, deleteEvent, updateEvent } from "./actions";

interface SchedulerDomainState {
  events: any[];
  currentDate: number;
  view: "day" | "week" | "month";
  config: any;
}

const initialState: SchedulerDomainState = {
  events: seedEvents,
  currentDate: seedDate,
  view: seedView,
  config: {},
};

const domainSlice = createSlice({
  name: "schedulerDomain",
  initialState,
  reducers: {
    setCurrentDate(state, { payload }: PayloadAction<number>) {
      state.currentDate = payload;
    },
    setView(state, { payload }: PayloadAction<"day" | "week" | "month">) {
      state.view = payload;
    },
    updateConfig(state, { payload }: PayloadAction<Partial<any>>) {
      state.config = { ...state.config, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(deleteEvent, (state, action) => {
        state.events = state.events.filter(e => String(e.id) != String(action.payload.id));
      })
      .addCase(updateEvent, (state, action) => {
        const index = state.events.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = { ...state.events[index], ...action.payload };
        }
      });
  },
});

export const {
  setCurrentDate,
  setView,
  updateConfig,
} = domainSlice.actions;

import { withHistory } from "./historyWrapper";
export default withHistory(domainSlice.reducer);