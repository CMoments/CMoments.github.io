import { atom } from "jotai";
import { seedEvents, seedView, seedDate, type SchedulerView } from "../../common/Seed";

interface SchedulerState {
  events: any[];
  currentDate: number;
  view: SchedulerView;
  config: any;
}

const schedulerAtom = atom<SchedulerState>({
  events: seedEvents,
  currentDate: seedDate,
  view: seedView,
  config: {},
});

const pastAtom = atom<SchedulerState[]>([]);
const futureAtom = atom<SchedulerState[]>([]);

const MAX_HISTORY_SIZE = 50;

const schedulerAtomWithHistory = atom(
  (get) => get(schedulerAtom),
  (get, set, action: { type: string; payload?: any }) => {
    const past = get(pastAtom);
    const future = get(futureAtom);
    const currentState = get(schedulerAtom);

    switch (action.type) {
      case "updateEvent": {
        const e = action.payload;
        const i = currentState.events.findIndex((ev) => ev.id === e.id);
        if (i === -1) return;
        const newEvents = [...currentState.events];
        newEvents[i] = { ...newEvents[i], ...e };
        set(pastAtom, [...past, currentState].slice(-MAX_HISTORY_SIZE));
        set(futureAtom, []);
        set(schedulerAtom, { ...currentState, events: newEvents });
        break;
      }
      case "createEvent": {
        const payload = action.payload;
        const newId = `id_${Date.now().toString()}`;
        const newEvent = { ...payload, id: newId };
        set(pastAtom, [...past, currentState].slice(-MAX_HISTORY_SIZE));
        set(futureAtom, []);
        set(schedulerAtom, {
          ...currentState,
          events: [...currentState.events, newEvent],
        });
        return newEvent;
      }
      case "deleteEvent": {
        const id = action.payload as string | number;
        set(pastAtom, [...past, currentState].slice(-MAX_HISTORY_SIZE));
        set(futureAtom, []);
        set(schedulerAtom, {
          ...currentState,
          events: currentState.events.filter(
            (e) => String(e.id) !== String(id)
          ),
        });
        break;
      }
      case "setCurrentDate": {
        const date = action.payload as number;
        set(pastAtom, [...past, currentState].slice(-MAX_HISTORY_SIZE));
        set(futureAtom, []);
        set(schedulerAtom, { ...currentState, currentDate: date });
        break;
      }
      case "setView": {
        const view = action.payload as SchedulerView;
        set(pastAtom, [...past, currentState].slice(-MAX_HISTORY_SIZE));
        set(futureAtom, []);
        set(schedulerAtom, { ...currentState, view });
        break;
      }
      case "undo": {
        if (past.length === 0) return;
        const previous = past[past.length - 1];
        set(pastAtom, past.slice(0, past.length - 1));
        set(futureAtom, [currentState, ...future].slice(0, MAX_HISTORY_SIZE));
        set(schedulerAtom, previous);
        break;
      }
      case "redo": {
        if (future.length === 0) return;
        const next = future[0];
        set(futureAtom, future.slice(1));
        set(pastAtom, [...past, currentState].slice(-MAX_HISTORY_SIZE));
        set(schedulerAtom, next);
        break;
      }
    }
  }
);

export {
  schedulerAtomWithHistory,
  schedulerAtom,
  pastAtom,
  futureAtom,
};