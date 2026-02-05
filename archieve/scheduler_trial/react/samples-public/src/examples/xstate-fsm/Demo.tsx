import { useCallback, useMemo } from "react";
import { useMachine } from "@xstate/react";
import ReactScheduler from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";
import Toolbar from "../../common/Toolbar";
import { schedulerMachine } from "./machine";
import { type SchedulerView } from "../../common/Seed";

export default function DemoXStateScheduler() {
  const [state, send] = useMachine(schedulerMachine);

  const activeDate = useMemo(() => new Date(state.context.date), [state.context.date]);

  const data = useMemo(() => ({
    save: (entity: "event", action: "create" | "update" | "delete", payload: any, id: string | number) => {
      if (entity !== "event") return;
      switch (action) {
        case "create":
          send({ type: "CREATE_EVENT", event: payload });
          break;
        case "update":
          send({ type: "UPDATE_EVENT", event: payload });
          break;
        case "delete":
          send({ type: "DELETE_EVENT", id });
          break;
        default:
          console.warn(`Unhandled action: ${action}`);
      }
    }
  }), [send]);
  const handleDateNavigation = useCallback((action: 'prev' | 'next' | 'today') => {
    if (action === 'today') {
      send({ type: "SET_DATE", date: Date.now() })
      return;
    }
    const step = action === 'next' ? 1 : -1;
    const date = new Date(state.context.date);

    if (state.context.view === "day") {
      date.setDate(date.getDate() + step);
    } else if (state.context.view === "week") {
      date.setDate(date.getDate() + step * 7);
    } else {
      date.setMonth(date.getMonth() + step);
    }
    send({ type: "SET_DATE", date: date.getTime() })
  }, [state.context.date, state.context.view, send]);

  const handleUndo = useCallback(() => send({ type: "UNDO" }), [send]);
  const handleRedo = useCallback(() => send({ type: "REDO" }), [send]);
  const handleSetView = useCallback((view: SchedulerView) => send({ type: "SET_VIEW", view: view }), [send]);
  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={state.context.view}
        currentDate={activeDate}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        setView={handleSetView}
      />
      <ReactScheduler
        events={state.context.events}
        view={state.context.view}
        date={activeDate}
        xy={memoizedXY}
        config={state.context.config}
        data={data}
      />
    </div>
  );
}
