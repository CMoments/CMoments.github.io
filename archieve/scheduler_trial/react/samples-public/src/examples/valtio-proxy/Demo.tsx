import { useCallback, useMemo } from "react";
import ReactScheduler from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";
import Toolbar from "../../common/Toolbar";
import schedulerState from "./store";
import { useSnapshot } from "valtio";
import { SchedulerView } from "../../common/Seed";

export default function DemoValtioScheduler() {
  const snap = useSnapshot(schedulerState.state);

  const activeDate = useMemo(() => new Date(snap.currentDate), [snap.currentDate]);
  const setCurrentDate = useCallback((date: number) => { schedulerState.actions.setCurrentDate(date); }, []);
  const setView = useCallback((view: SchedulerView) => { schedulerState.actions.setView(view); }, []);
  const updateEvent = useCallback((payload: any) => { return schedulerState.actions.updateEvent(payload); }, []);
  const createEvent = useCallback((payload: any) => { return schedulerState.actions.createEvent(payload); }, []);
  const deleteEvent = useCallback((id: string | number) => { return schedulerState.actions.deleteEvent(id); }, []);
  const handleUndo = useCallback(() => { schedulerState.actions.undo(); }, []);
  const handleRedo = useCallback(() => { schedulerState.actions.redo(); }, []);

  const handleDateNavigation = useCallback(
    (action: "prev" | "next" | "today") => {
      if (action === "today") {
        setCurrentDate(Date.now());
        return;
      }
      const step = action === "next" ? 1 : -1;
      const date = new Date(snap.currentDate);
      if (snap.view === "day") {
        date.setDate(date.getDate() + step);
      } else if (snap.view === "week") {
        date.setDate(date.getDate() + step * 7);
      } else {
        date.setMonth(date.getMonth() + step);
      }
      setCurrentDate(date.getTime());
    },
    [snap.currentDate, snap.view, setCurrentDate]
  );

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
        }
      },
    }),
    [updateEvent, createEvent, deleteEvent]
  );

  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={snap.view}
        currentDate={activeDate}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        setView={setView}
      />
      <ReactScheduler
        events={snap.events}
        view={snap.view}
        date={activeDate}
        xy={memoizedXY} /* hide built-in navbar */
        config={snap.config}
        data={dataBridge}
      />
    </div>
  );
}