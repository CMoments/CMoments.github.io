import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Event } from "@dhx/trial-react-scheduler";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export interface SchedulerEditorContext {
  events: Event[];
  handleSaveEvent: (updated: Event) => void;
  handleDeleteEvent: (id: string) => void;
  createEvent: (newEvent: Event) => void;
}

export default function SchedulerssEditorViewDemo() {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, classname: "blue", start_date: new Date("2025-08-11T02:00:00Z"), end_date: new Date("2025-08-11T10:20:00Z"), text: "Product Strategy Hike" },
    { id: 2, classname: "blue", start_date: new Date("2025-08-11T12:00:00Z"), end_date: new Date("2025-08-11T16:00:00Z"), text: "Agile Meditation and Release" },
    { id: 3, classname: "violet", start_date: new Date("2025-08-12T06:00:00Z"), end_date: new Date("2025-08-12T11:00:00Z"), text: "Tranquil Tea Time" },
    { id: 4, classname: "green", start_date: new Date("2025-08-12T11:30:00Z"), end_date: new Date("2025-08-12T19:00:00Z"), text: "Sprint Review and Retreat" },
    { id: 5, classname: "violet", start_date: new Date("2025-08-13T01:00:00Z"), end_date: new Date("2025-08-13T03:00:00Z"), text: "Kayaking Workshop" },
    { id: 6, classname: "yellow", start_date: new Date("2025-08-13T06:00:00Z"), end_date: new Date("2025-08-13T08:00:00Z"), text: "Stakeholder Sunset Yoga Session" },
    { id: 7, classname: "green", start_date: new Date("2025-08-13T07:00:00Z"), end_date: new Date("2025-08-13T12:00:00Z"), text: "Roadmap Alignment Walk" },
    { id: 8, classname: "violet", start_date: new Date("2025-08-13T13:00:00Z"), end_date: new Date("2025-08-13T18:00:00Z"), text: "Mindful Team Building" },
    { id: 9, classname: "blue", start_date: new Date("2025-08-14T01:00:00Z"), end_date: new Date("2025-08-14T18:00:00Z"), text: "Cross-Functional Expedition" },
    { id: 10, classname: "yellow", start_date: new Date("2025-08-14T14:00:00Z"), end_date: new Date("2025-08-14T20:00:00Z"), text: "User Feedback Picnic" },
    { id: 11, classname: "blue", start_date: new Date("2025-08-15T03:00:00Z"), end_date: new Date("2025-08-15T08:00:00Z"), text: "Demo and Showcase" },
    { id: 12, classname: "yellow", start_date: new Date("2025-08-15T11:00:00Z"), end_date: new Date("2025-08-15T17:00:00Z"), text: "Quality Assurance Spa Day" },
    { id: 13, classname: "violet", start_date: new Date("2025-08-16T01:00:00Z"), end_date: new Date("2025-08-16T03:00:00Z"), text: "Motion Cycling Adventure" },
    { id: 14, classname: "blue", start_date: new Date("2025-08-16T10:00:00Z"), end_date: new Date("2025-08-16T16:00:00Z"), text: "Competitor Analysis Beach Day" },
    { id: 15, classname: "blue", start_date: new Date("2025-08-17T02:00:00Z"), end_date: new Date("2025-08-17T06:00:00Z"), text: "Creativity Painting Retreat" }
  ]);


  function handleSaveEvent(updated: Event) {

    setEvents((prev) =>
      prev.map((e) => (e.id === updated.id ? { ...updated, $new: undefined } : e))
    );
  }
  function handleDeleteEvent(id: string) {
    setEvents(prev => prev.filter(e => e.id !== id));
  }

  function createEvent(newEvent: Event) {
    setEvents((prev) => {
      const exists = prev.find((t) => t.id === newEvent.id);
      if (!exists) {
        return [...prev, newEvent];
      } else {
        return prev.map((t) => (t.id === newEvent.id ? newEvent : t));
      }
    });
  }

  return (
    <div className="demo-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Outlet
          context={{
            events: events,
            handleSaveEvent,
            handleDeleteEvent,
            createEvent,
          } satisfies SchedulerEditorContext}
        />
      </LocalizationProvider>
    </div>
  );
}
