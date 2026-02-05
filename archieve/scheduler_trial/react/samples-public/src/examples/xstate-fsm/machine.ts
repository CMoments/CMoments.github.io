import { createMachine, assign } from "xstate";
import type { SchedulerConfig } from "@dhx/trial-react-scheduler";
import { seedEvents, seedView, seedDate, type SchedulerView } from "../../common/Seed";

export interface Ctx {
  events: any[];
  view: SchedulerView;
  date: number;
  config: SchedulerConfig;
  past: SchedulerState[];
  future: SchedulerState[];
  maxHistory: number;
}

interface SchedulerState {
  events: any[];
  view: SchedulerView;
  date: number;
}

type SetViewEvent = { type: "SET_VIEW"; view: SchedulerView };
type SetDateEvent = { type: "SET_DATE"; date: number };
type CreateEvent = { type: "CREATE_EVENT"; event: any };
type UpdateEvent = { type: "UPDATE_EVENT"; event: any };
type DeleteEvent = { type: "DELETE_EVENT"; id: string | number }
type UndoEvent = { type: 'UNDO' };
type RedoEvent = { type: 'REDO' };

type Ev =
  | SetViewEvent
  | SetDateEvent
  | CreateEvent
  | UpdateEvent
  | DeleteEvent
  | UndoEvent
  | RedoEvent

const takeSnapshot = (ctx: any): SchedulerState => ({
  events: [...ctx.events],
  view: ctx.view,
  date: ctx.date,
});

export const schedulerMachine = createMachine({
  id: "scheduler",
  types: {
    context: {} as Ctx,
    events: {} as Ev,
  },
  context: {
    events: seedEvents,
    view: seedView,
    date: seedDate,
    config: {},
    past: [],
    future: [],
    maxHistory: 50,
  },
  initial: "ready",
  states: {
    ready: {
      on: {
        SET_VIEW: { actions: ['saveToHistory', 'setView'] },
        SET_DATE: { actions: ['saveToHistory', 'setDate'] },
        CREATE_EVENT: { actions: ['saveToHistory', 'createEvent'] },
        UPDATE_EVENT: { actions: ['saveToHistory', 'updateEvent'] },
        DELETE_EVENT: { actions: ['saveToHistory', 'deleteEvent'] },
        UNDO: {
          guard: ({ context }) => context.past.length > 0,
          actions: ['undo']
        },
        REDO: {
          guard: ({ context }) => context.future.length > 0,
          actions: ['redo']
        },
      }
    }
  },
},
  {
    actions: {
      saveToHistory: assign({
        past: ({ context }) => {
          const newPast = [...context.past, takeSnapshot(context)];
          if (newPast.length > context.maxHistory) {
            newPast.shift();
          }
          return newPast;
        },
        future: () => [],
      }),
      setView: assign({
        view: ({ event }) => (event as SetViewEvent).view
      }),
      setDate: assign({
        date: ({ event }) => (event as SetDateEvent).date
      }),
      createEvent: assign({
        events: ({ context, event }) => {
            const newId = `id_${Date.now()}`;
            const newEvent = { ...(event as CreateEvent).event, id: newId };
            return [...context.events, newEvent];
        }
      }),
      updateEvent: assign({
        events: ({ context, event }) =>
          context.events.map(ev =>
            String(ev.id) === String((event as UpdateEvent).event.id)
              ? { ...ev, ...(event as UpdateEvent).event }
              : ev
          )
      }),
      deleteEvent: assign({
        events: ({ context, event }) =>
          context.events.filter(ev => String(ev.id) !== String((event as DeleteEvent).id))
      }),
      undo: assign(({ context }) => {
        const currentState = takeSnapshot(context);
        const previousState = context.past[context.past.length - 1];
        const newPast = context.past.slice(0, -1);
        const newFuture = [currentState, ...context.future];

        return {
          ...previousState,
          past: newPast,
          future: newFuture,
        };
      }),
      redo: assign(({ context }) => {
        const currentState = takeSnapshot(context);
        const nextState = context.future[0];
        const newFuture = context.future.slice(1);
        const newPast = [...context.past, currentState];

        return {
          ...nextState,
          past: newPast,
          future: newFuture,
        };
      })
    }
  }
);