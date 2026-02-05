import { proxy } from 'valtio';
import { seedEvents, seedView, seedDate, type SchedulerView } from '../../common/Seed';

export const createSchedulerStore = () => {
  const state = proxy({
    events: seedEvents as any[],
    currentDate: seedDate as number,
    view: seedView as SchedulerView,
    config: {} as any,

    // Undo/redo history stacks and capacity
    _past: [] as { events: any[]; currentDate: number; view: SchedulerView }[],
    _future: [] as { events: any[]; currentDate: number; view: SchedulerView }[],
    _cap: 50,
  });

  // Helper to save snapshot to _past and clear _future
  const recordHistory = () => {
    state._past.push({
      events: state.events,
      currentDate: state.currentDate,
      view: state.view,
    });
    if (state._past.length > state._cap) state._past.shift();
    state._future.length = 0;
  };

  // Wrap each mutating action to record history before applying changes
  const actions = {
    updateEvent: (payload: any) => {
      recordHistory();
      const index = state.events.findIndex((e) => e.id === payload.id);
      if (index !== -1) {
        const newEvents = [...state.events];
        newEvents[index] = { ...newEvents[index], ...payload };
        state.events = newEvents;
      }
    },

    createEvent: (payload: any) => {
      recordHistory();
      const newEvent = { ...payload, id: `id_${Date.now().toString()}` };
      state.events = [...state.events, newEvent];
      return newEvent;
    },

    deleteEvent: (id: string | number) => {
      recordHistory();
      state.events = state.events.filter((e) => String(e.id) !== String(id));
    },

    setCurrentDate: (date: number) => {
      recordHistory();
      state.currentDate = date;
    },

    setView: (view: SchedulerView) => {
      recordHistory();
      state.view = view;
    },

    undo: () => {
      if (state._past.length === 0) return;
      const previous = state._past.pop()!;

      state._future.unshift({
        events: state.events,
        currentDate: state.currentDate,
        view: state.view,
      });

      state.events = previous.events;
      state.currentDate = previous.currentDate;
      state.view = previous.view;
    },

    redo: () => {
      if (state._future.length === 0) return;
      const next = state._future.shift()!;

      state._past.push({
        events: state.events,
        currentDate: state.currentDate,
        view: state.view,
      });

      state.events = next.events;
      state.currentDate = next.currentDate;
      state.view = next.view;
    },
  };

  return { state, actions };
};

export const schedulerStore = createSchedulerStore();
export default schedulerStore;
