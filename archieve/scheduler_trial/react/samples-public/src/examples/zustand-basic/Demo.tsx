import ReactScheduler from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";
import Toolbar from "../../common/Toolbar";
import useSchedulerStore from "./store";
import { useCallback, useMemo } from "react";

export default function DemoZustandScheduler() {
  const {
    events,
    view,
    currentDate,
    config,
    setView,
    setCurrentDate,
    createEvent,
    updateEvent,
    deleteEvent,
    undo,
    redo,
  } = useSchedulerStore();

  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);

  const handleDateNavigation = useCallback((action: 'prev' | 'next' | 'today') => {
    if (action === 'today') {
      setCurrentDate(Date.now());
      return;
    }

    const step = action === 'next' ? 1 : -1;
    const date = new Date(currentDate);

    if (view === "day") {
      date.setDate(date.getDate() + step);
    } else if (view === "week") {
      date.setDate(date.getDate() + step * 7);
    } else {
      date.setMonth(date.getMonth() + step);
    }
    setCurrentDate(date.getTime());
  }, [currentDate, view, setCurrentDate]);

  // Scheduler <-> Zustand data bridge - matches Redux version structure
  const dataBridge = useMemo(() => ({
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
  }), [updateEvent, createEvent, deleteEvent]);

  const handleUndo = useCallback(() => undo(), [undo]);
  const handleRedo = useCallback(() => redo(), [redo]);
  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={view}
        currentDate={activeDate}
        onUndo={handleUndo}
        onRedo={handleRedo}
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
