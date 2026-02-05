import React, { useEffect, useRef, useState } from 'react';
import ReactScheduler, { SchedulerConfig, SchedulerTemplates, UnitsViewConfig, SchedulerSizes, Event, SchedulerViewsProp } from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";
import "./styles.css"


export default function SchedulerTemplatesDemo() {
  useEffect(() => {
    document.title = "DHTMLX React Scheduler | Units View";
  }, []);

  const sections = [
    { key: 1, label: "Dr. Smith" },
    { key: 2, label: "Dr. Brown" },
    { key: 3, label: "Dr. Wilson" }
  ];

  const locale = {
    labels: {
      unit_tab: "Day Units",
      week_unit_tab: "Week Units",
      section_custom: "Section"
    }
  };

  const config: SchedulerConfig = {
    header: [
      "unit",
      "week_unit",
      "month",
      "date",
      "prev",
      "today",
      "next"
    ],
    hour_size_px: 50,
    first_hour: 8,
    last_hour: 20,
    lightbox: {
      sections: [
        { name: "description", height: 130, map_to: "text", type: "textarea", focus: true },
        { name: "custom", height: 23, type: "select", options: sections, map_to: "doctor_id" },
        { name: "time", height: 72, type: "time", map_to: "auto" }
      ]
    }
  }

  const views: SchedulerViewsProp = {
    units: [
      {
        name: "unit",
        property: "doctor_id",
        list: [
          { key: 1, label: "Dr. Smith" },
          { key: 2, label: "Dr. Brown" },
          { key: 3, label: "Dr. Wilson" }
        ]
      },
      {
        name: "week_unit",
        property: "doctor_id",
        list: [
          { key: 1, label: "Dr. Smith" },
          { key: 2, label: "Dr. Brown" },
          { key: 3, label: "Dr. Wilson" }
        ],
        // date: {
        //   start: (date: Date) => {
        //     const day = date.getDay();
        //     const diff = day === 0 ? -6 : 1 - day; // Adjust to start on Monday
        //     return new Date(date.setDate(date.getDate() + diff));
        //   },
        //   add: (date: Date, step: number) => {
        //     return new Date(date.setDate(date.getDate() + step * 7));
        //   }
        // },
        days: 5
      }
    ]
  };

  const initialData: { events: Event[] } = {
    events: [
      { id: 1, start_date: new Date("2025-07-28T09:00"), end_date: new Date("2025-07-28T11:00"), text: "General Check-up", doctor_id: 1, classname: "violet" },
      { id: 2, start_date: new Date("2025-07-28T09:30"), end_date: new Date("2025-07-28T10:15"), text: "Flu Symptoms", doctor_id: 2, classname: "green" },
      { id: 3, start_date: new Date("2025-07-28T10:00"), end_date: new Date("2025-07-28T11:00"), text: "X-ray Review", doctor_id: 3, classname: "yellow" },
      { id: 4, start_date: new Date("2025-07-28T11:15"), end_date: new Date("2025-07-28T12:45"), text: "Blood Pressure", doctor_id: 1, classname: "violet" },
      { id: 5, start_date: new Date("2025-07-28T13:00"), end_date: new Date("2025-07-28T14:00"), text: "Nutrition Consult", doctor_id: 2, classname: "green" },
      { id: 6, start_date: new Date("2025-07-28T14:15"), end_date: new Date("2025-07-28T15:00"), text: "Dermatology", doctor_id: 3, classname: "yellow" },
      { id: 7, start_date: new Date("2025-07-28T15:30"), end_date: new Date("2025-07-28T16:30"), text: "Post-op Check", doctor_id: 1, classname: "violet" },
      { id: 8, start_date: new Date("2025-07-29T08:30"), end_date: new Date("2025-07-29T09:30"), text: "ENT Visit", doctor_id: 2, classname: "green" },
      { id: 9, start_date: new Date("2025-07-29T09:00"), end_date: new Date("2025-07-29T09:45"), text: "Lab Results", doctor_id: 3, classname: "yellow" },
      { id: 10, start_date: new Date("2025-07-29T10:00"), end_date: new Date("2025-07-29T11:00"), text: "Cardio Follow-up", doctor_id: 1, classname: "violet" },
      { id: 11, start_date: new Date("2025-07-29T11:15"), end_date: new Date("2025-07-29T12:15"), text: "Vaccination", doctor_id: 2, classname: "green" },
      { id: 12, start_date: new Date("2025-07-29T13:00"), end_date: new Date("2025-07-29T14:30"), text: "Physiotherapy", doctor_id: 3, classname: "yellow" },
      { id: 13, start_date: new Date("2025-07-29T14:45"), end_date: new Date("2025-07-29T15:30"), text: "Migraine Review", doctor_id: 1, classname: "violet" },
      { id: 14, start_date: new Date("2025-07-29T16:00"), end_date: new Date("2025-07-29T17:00"), text: "Prescription Renew", doctor_id: 2, classname: "green" },
      { id: 15, start_date: new Date("2025-07-30T08:00"), end_date: new Date("2025-07-30T09:00"), text: "Annual Physical", doctor_id: 3, classname: "yellow" },
      { id: 16, start_date: new Date("2025-07-30T09:15"), end_date: new Date("2025-07-30T10:00"), text: "Orthopedic Consult", doctor_id: 1, classname: "violet" },
      { id: 17, start_date: new Date("2025-07-30T10:15"), end_date: new Date("2025-07-30T11:15"), text: "ECG Test", doctor_id: 2, classname: "green" },
      { id: 18, start_date: new Date("2025-07-30T12:00"), end_date: new Date("2025-07-30T13:00"), text: "Diabetes Check", doctor_id: 3, classname: "yellow" },
      { id: 19, start_date: new Date("2025-07-30T13:30"), end_date: new Date("2025-07-30T14:15"), text: "Allergy Shots", doctor_id: 1, classname: "violet" },
      { id: 20, start_date: new Date("2025-07-30T15:00"), end_date: new Date("2025-07-30T16:00"), text: "Post-surgery Eval", doctor_id: 2, classname: "green" }
    ]
  };

  const templates: SchedulerTemplates = {
    event_class: (start, end, event) => {
      return event.classname || '';
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactScheduler
        events={initialData.events}
        date={new Date("2025-07-28T09:00")}
        locale={locale}
        views={views}
        view={"week_unit"}
        templates={templates}
        config={config}
      />
    </div>
  );
};