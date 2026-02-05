import { useCallback, useMemo } from "react";
import ReactScheduler from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";
import Toolbar from "../../common/Toolbar";
import { useAtom } from "jotai";
import { schedulerAtomWithHistory } from "./schedulerAtoms";
import { type SchedulerView } from "../../common/Seed";

export default function DemoJotaiScheduler() {
  const [state, dispatch] = useAtom(schedulerAtomWithHistory);

  const { events, view, currentDate, config } = state;

  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);
  const setCurrentDate = useCallback((timestamp: number) => dispatch({ type: "setCurrentDate", payload: timestamp }), [dispatch]);
  const setView = useCallback((view: SchedulerView ) => dispatch({ type: "setView", payload: view }), [dispatch]);
  const createEvent = useCallback((event: any ) => dispatch({ type: "createEvent", payload: event }), [dispatch]);
  const updateEvent = useCallback((event: any ) => dispatch({ type: "updateEvent", payload: event }), [dispatch]);
  const deleteEvent = useCallback((id: number | string) => dispatch({ type: "deleteEvent", payload: id }), [dispatch]);
  const undo = useCallback(() => dispatch({ type: "undo" }), [dispatch]);
  const redo = useCallback(() => dispatch({ type: "redo" }), [dispatch]);

  const handleDateNavigation = useCallback(
    (action: "prev" | "next" | "today") => {
      if (action === "today") {
        setCurrentDate(Date.now());
        return;
      }
      const step = action === "next" ? 1 : -1;
      const date = new Date(currentDate);

      if (view === "day") {
        date.setDate(date.getDate() + step);
      } else if (view === "week") {
        date.setDate(date.getDate() + step * 7);
      } else {
        date.setMonth(date.getMonth() + step);
      }
      setCurrentDate(date.getTime());
    },
    [currentDate, view, setCurrentDate]
  );

  // Scheduler <-> Jotai data bridge
  const dataBridge = useMemo(
    () => ({
      save: (entity: "event", action: "create" | "update" | "delete", payload: any, id: string | number) => {
        if (entity !== "event") return;
        switch (action) {
          case "update":
            return updateEvent(payload);
          case "create":
            return createEvent(payload);
          case "delete":
            return deleteEvent(id);
          default:
            console.warn(`Unknown action: ${action}`);
            return;
        }
      },
    }),
    [updateEvent, createEvent, deleteEvent]
  );

  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={view}
        currentDate={activeDate}
        onUndo={undo}
        onRedo={redo}
        onNavigate={handleDateNavigation}
        setView={setView}
      />
      <ReactScheduler
        events={events}
        view={view}
        date={activeDate}
        xy={memoizedXY} /* hide built-in navbar */
        config={config}
        data={dataBridge}
      />
    </div>
  );
}
