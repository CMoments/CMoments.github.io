import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactScheduler from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";
import Toolbar from "../../common/Toolbar";
import { setCurrentDate, setView } from "../../redux/schedulerSlice";
import { createEvent, updateEvent, deleteEvent, dispatchAction } from "../../redux/actions";
import { undo, redo } from "../../redux/historyWrapper";
import type { RootState } from "../../redux/store";

/**
 * Scheduler demo wired to Redux Toolkit history.
 *
 * • Toolbar buttons (Day/Week/Month, Prev/Next/Today) dispatch actions that
 *   update `view` and `currentDate` in the slice.
 * • Undo / Redo roll back any state change – including view switches and CRUD.
 * • No custom Timeline view needed: we simply set `view={view}` ("day", "week",
 *   or "month"), which are built‑in Scheduler modes.
 */
export default function ReactSchedulerReduxDemo() {
  useEffect(() => {
    document.title = "DHTMLX React Scheduler | Redux Toolkit & Undo/Redo";
  }, []);

  const dispatch = useDispatch();

  const present = useSelector((s: RootState) => s.scheduler.present);

  const { events, view, currentDate, config } = present;
  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);

  const handleDateNavigation = useCallback((action: 'prev' | 'next' | 'today') => {
    if (action === 'today') {
      dispatch(setCurrentDate(Date.now()));
      return;
    }

    const step = action === 'next' ? 1 : -1;
    const date = new Date(activeDate);

    if (view === "day") {
      date.setDate(date.getDate() + step);
    } else if (view === "week") {
      date.setDate(date.getDate() + step * 7);
    } else {
      date.setMonth(date.getMonth() + step);
    }
    dispatch(setCurrentDate(date.getTime()));
  }, [activeDate, view, dispatch]);

  // Scheduler <-> Redux data bridge 
const dataBridge = useMemo(() => ({
  save: (entity: "event", action: "create" | "update" | "delete", payload: any, id: string | number) => {
    if (entity !== "event") return;

    switch (action) {
      case "update":
        return dispatchAction(dispatch, updateEvent, payload); // Return the updated event data
      case "create":
        return dispatchAction(dispatch, createEvent, payload); // Return the created event with ID
      case "delete":
        return dispatchAction(dispatch, deleteEvent, payload); // Return deletion confirmation
      default:
        console.warn(`Unknown action: ${action}`);
        return;
    }
  },
}), [dispatch]);

  const handleViewChange = useCallback((mode: string, date: Date) => {
    if (mode === "day") {
      dispatch(setView("day"));
    } else if (mode === "week") {
      dispatch(setView("week"));
    } else {
      dispatch(setView("month"));
    }
    dispatch(setCurrentDate(date.getTime()));
  }, [dispatch]);

  const handleUndo = useCallback(() => dispatch(undo()), [dispatch]);
  const handleRedo = useCallback(() => dispatch(redo()), [dispatch]);
  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={view}
        currentDate={activeDate}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        setView={handleViewChange}
      />

      <ReactScheduler
        events={events}
        view={view}
        date={activeDate}
        xy={memoizedXY} /* hide built‑in navbar */
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
