import { create } from "zustand";
import { seedEvents, seedView, seedDate, type SchedulerView } from "../../common/Seed";

interface SchedulerDomainState {
  events: any[];
  currentDate: number;
  view: SchedulerView;
  config: any;
  _generateId: () => void;
  setCurrentDate: (date: number) => void;
  setView: (z: SchedulerView) => void;
  updateEvent: (e: any) => void;
  createEvent: (e: any) => void;
  deleteEvent: (e: any) => void;
  undo: () => void;
  redo: () => void;
}

// Basic history wrapper middleware for Zustand
const withHistory = (config: (set: any, get: any) => SchedulerDomainState) => (set: any, get: any) => {
  let past: Partial<Pick<SchedulerDomainState, 'events' | 'currentDate' | 'view'>>[] = [];
  let future: Partial<Pick<SchedulerDomainState, 'events' | 'currentDate' | 'view'>>[] = [];
  const cap = 50;

  return {
    ...config(
      (partial: Partial<SchedulerDomainState>, replace: boolean) => {
        const currentState = get();

        // Extract only the desired keys for history
        const currentStateForHistory = {
          events: currentState.events,
          currentDate: currentState.currentDate,
          view: currentState.view,
        };

        // Skip history on undo/redo actions
        if (partial.undo || partial.redo) {
          return;
        }

        past.push(currentStateForHistory);
        if (past.length > cap) past.shift();
        future = [];

        set(partial, replace);
      },
      get
    ),
    undo: () => {
      if (past.length === 0) return;
      const previous = past.pop()!;
      const currentState = get();
      // Restore only the selected slices, merging with current full state
      set(
        {
          ...currentState,
          ...previous,
        },
        true
      );
      future.unshift(currentState);
    },
    redo: () => {
      if (future.length === 0) return;
      const next = future.shift()!;
      const currentState = get();
      set(
        {
          ...currentState,
          ...next,
        },
        true
      );
      past.push(currentState);
    },
  };
};

// Your initial state and actions inside base store config
const createSchedulerStore = (set: any, get: any): SchedulerDomainState => ({
  events: seedEvents,
  currentDate: seedDate,
  view: seedView,
  config: {},
  //Simulate receiving ID from backend
  _generateId: () => {
    return `id_${Date.now().toString()}`;
  },
  updateEvent: (payload: any) => set((state: SchedulerDomainState) => {
    const i = state.events.findIndex((e: any) => e.id === payload.id);
    if (i !== -1) {
      const newEvents = [...state.events];
      newEvents[i] = { ...newEvents[i], ...payload };
      return { events: newEvents };
    }
    return {};
  }),
  createEvent: (payload: any) => { 
    const uid = get()._generateId();
    const newEvent = { ...payload, id: uid };
    
    set((state: SchedulerDomainState) => ({ 
      events: [...state.events, newEvent] 
    }));
    
    return newEvent;
  },
  deleteEvent: (id: string | number) => set((state: SchedulerDomainState) => ({
    events: state.events.filter(e => String(e.id) !== String(id))
  })),
  setCurrentDate: (payload: number) => set({ currentDate: payload }),
  setView: (payload: SchedulerView) => set({ view: payload }),
  undo: () => { },
  redo: () => { },
});

// Wraps SchedulerStore in past/future history
const useSchedulerStore = create(withHistory(createSchedulerStore));

export default useSchedulerStore;