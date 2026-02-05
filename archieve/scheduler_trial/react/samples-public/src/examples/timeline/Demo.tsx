import React, { useState, useMemo, useCallback, useEffect } from "react";
import ReactScheduler, { TimelineViewConfig, SchedulerSizes, SchedulerViewsProp } from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


const yUnitRooms = [
  { key: "alpha", label: "Team Alpha" },
  { key: "beta", label: "Team Beta" },
  { key: "gamma", label: "Team Gamma" },
  { key: "delta", label: "Team Delta" },
  { key: "epsilon", label: "Ops Epsilon" },
  { key: "zeta", label: "Design Zeta" },
];


function buildTimelineConfig(zoom: "day" | "week" | "month") {
  switch (zoom) {
    case "day":
      return {
        name: "rooms-day",
        x_unit: "hour",
        x_date: "%H:%i",
        x_step: 2,
        x_size: 8,
        x_start: 4,
        x_length: 12,
        event_dy: 60,
        resize_events: false,
        y_property: "section",
        render: "bar",
        y_unit: yUnitRooms,
        date: {
          start: (date, scheduler) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0), // 8 am
          add: (date, step, scheduler) => scheduler.date.add(date, step, "day"),
        },
      } as TimelineViewConfig;

    case "week":
      return {
        name: "rooms-week",
        x_unit: "day",
        x_date: "%D %d",
        x_step: 1,
        x_size: 7,
        x_start: 0,
        x_length: 7,
        event_dy: 60,
        y_property: "section",
        render: "bar",
        y_unit: yUnitRooms,
        date: {
          start: (d, scheduler) => scheduler.date.week_start(d),
          add: (d, step, scheduler) => scheduler.date.add(d, step, "week"),
        },
      } as TimelineViewConfig;

    case "month":
    default:
      return {
        name: "rooms-month",
        x_unit: "week",
        x_date: "W%W",
        x_step: 1,
        x_size: 4,
        x_start: 0,
        x_length: 4,
        event_dy: 60,
        y_property: "section",
        render: "bar",
        y_unit: yUnitRooms,
        date: {
          start: (d, scheduler) => scheduler.date.month_start(d),
          add: (d, step, scheduler) => scheduler.date.add(d, step, "month"),
        },
      } as TimelineViewConfig;
  }
}

export default function SchedulerTimelineZoomDemo() {
  useEffect(() => {
    document.title = "DHTMLX React Scheduler | Timeline View & Custom Toolbar";
  }, []);


  const [zoom, setZoom] = useState<"day" | "week" | "month">("day");
  const [currentDate, setCurrentDate] = useState(new Date("2025-08-03"));
  const [query, setQuery] = useState("");

  /* reconstruct the views prop only when zoom changes */
  const views: SchedulerViewsProp = useMemo(
    () => ({
      timeline: [
        {
          name: "rooms-day",
          x_unit: "hour",
          x_date: "%H:%i",
          x_step: 2,
          x_size: 8,
          x_start: 4,
          x_length: 12,
          event_dy: 60,
          resize_events: false,
          y_property: "section",
          render: "bar",
          y_unit: yUnitRooms,
          date: {
            start: (date, scheduler) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0), // 8 am
            add: (date, step, scheduler) => scheduler.date.add(date, step, "day"),
          },
        },
        {
          name: "rooms-week",
          x_unit: "day",
          x_date: "%D %d",
          x_step: 1,
          x_size: 7,
          x_start: 0,
          x_length: 7,
          event_dy: 60,
          y_property: "section",
          render: "bar",
          y_unit: yUnitRooms,
          date: {
            start: (d, scheduler) => scheduler.date.week_start(d),
            add: (d, step, scheduler) => scheduler.date.add(d, step, "week"),
          },
        },
        {
          name: "rooms-month",
          x_unit: "week",
          x_date: "W%W",
          x_step: 1,
          x_size: 4,
          x_start: 0,
          x_length: 4,
          event_dy: 60,
          y_property: "section",
          render: "bar",
          y_unit: yUnitRooms,
          date: {
            start: (d, scheduler) => scheduler.date.month_start(d),
            add: (d, step, scheduler) => scheduler.date.add(d, step, "month"),
          },
        }
      ],
    }),
    []
  );

  const xy: SchedulerSizes = useMemo(() => ({
    nav_height: 0
  }), []);


  const currentViewName = useMemo(() => {
    switch (zoom) {
      case "day":
        return "rooms-day";
      case "week":
        return "rooms-week";
      case "month":
      default:
        return "rooms-month";
    }
  }, [zoom]);

  // Next/Prev buttons
  const addDate = useCallback(
    (step: number) => {
      setCurrentDate(prev => {
        const d = new Date(prev);
        if (zoom === "day") d.setDate(d.getDate() + step);
        else if (zoom === "week") d.setDate(d.getDate() + step * 7);
        else d.setMonth(d.getMonth() + step);
        return d;
      });
    },
    [zoom],
  );

  const handleViewChange = (
    mode: string, /* view name */
    date: Date,
  ) => {
    if (mode.includes("rooms-day")) {
      setZoom("day");
    } else if (mode.includes("rooms-week")) {
      setZoom("week");
    } else {
      setZoom("month");
    };
    setCurrentDate(date);
  };

  const filterFn = useCallback(
    (event: any) => {
      if (!query.trim()) return true;
      return event.text.toLowerCase().includes(query.trim().toLowerCase());
    },
    [query],
  );

  const events = [
    { id: 1, classname: "green", section: "alpha", text: "Sprint 24 Kick-off", start_date: new Date("2025-08-03T09:00:00"), end_date: new Date("2025-08-03T10:30:00") },
    { id: 2, classname: "yellow", section: "beta", text: "API Contract Review", start_date: new Date("2025-08-03T11:00:00"), end_date: new Date("2025-08-03T12:00:00") },
    { id: 3, classname: "purple", section: "gamma", text: "Load-testing Session", start_date: new Date("2025-08-03T13:00:00"), end_date: new Date("2025-08-03T15:00:00") },
    { id: 4, classname: "blue", section: "delta", text: "Marketing Sync", start_date: new Date("2025-08-03T14:30:00"), end_date: new Date("2025-08-03T15:30:00") },
    { id: 5, classname: "green", section: "alpha", text: "Backend Refactor", start_date: new Date("2025-08-03T08:30:00"), end_date: new Date("2025-08-03T11:30:00") },
    { id: 6, classname: "green", section: "zeta", text: "UX Wireframe Jam", start_date: new Date("2025-08-03T09:00:00"), end_date: new Date("2025-08-03T12:00:00") },
    { id: 7, classname: "purple", section: "epsilon", text: "Infra Upgrade v3.1", start_date: new Date("2025-08-03T12:30:00"), end_date: new Date("2025-08-03T14:00:00") },
    { id: 8, classname: "green", section: "beta", text: "Customer Advisory Call", start_date: new Date("2025-08-03T15:00:00"), end_date: new Date("2025-08-03T16:00:00") },
    { id: 9, classname: "purple", section: "gamma", text: "Perf Dashboard Demo", start_date: new Date("2025-08-03T09:30:00"), end_date: new Date("2025-08-03T10:30:00") },
    { id: 10, classname: "purple", section: "delta", text: "Campaign Retro", start_date: new Date("2025-08-03T11:00:00"), end_date: new Date("2025-08-03T12:00:00") },
    { id: 11, classname: "green", section: "epsilon", text: "Patch Window", start_date: new Date("2025-08-03T13:00:00"), end_date: new Date("2025-08-03T15:30:00") },
    { id: 12, classname: "purple", section: "zeta", text: "Hi-fi Prototype Walk", start_date: new Date("2025-08-03T14:00:00"), end_date: new Date("2025-08-03T16:00:00") }
  ];

  const Toolbar = (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ p: 1, borderBottom: "1px solid #ddd" }}
    >

      {(["day", "week", "month"] as const).map(level => (
        <Button
          key={level}
          variant={zoom === level ? "contained" : "outlined"}
          size="medium"
          onClick={() => setZoom(level)}
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </Button>
      ))}

      <TextField
        size="small"
        placeholder="Search events…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        sx={{ ml: 2, minWidth: 180 }}
      />

      <span style={{ flexGrow: 1 }} />
      <Typography variant="subtitle1" sx={{ ml: 1 }}>
        {currentDate.toLocaleDateString(undefined, {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Typography>
      <span style={{ flexGrow: 1 }} />
      <IconButton size="medium" onClick={() => addDate(-1)}>&nbsp;&lt;&nbsp;</IconButton>
      <Button
        size="medium"
        onClick={() => setCurrentDate(new Date())}
      >
        Today
      </Button>
      <IconButton size="medium" onClick={() => addDate(1)}>&nbsp;&gt;&nbsp;</IconButton>


    </Stack>
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>

      {Toolbar}

      <ReactScheduler
        events={events}
        view={currentViewName}
        date={currentDate}
        filter={filterFn}
        onViewChange={handleViewChange}
        locale={{
          labels: {
            "rooms-day_tab": "Day",
            "rooms-week_tab": "Week",
            "rooms-month_tab": "Month",
            section_custom: "Room",
          },
        }}
        xy={xy}
        views={views}
      />
    </div>
  );
}