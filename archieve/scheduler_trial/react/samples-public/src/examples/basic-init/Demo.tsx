import React, { useEffect, useRef, useState } from 'react';
import ReactScheduler, { Event, SchedulerConfig, SchedulerTemplates } from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";
import "./styles.css"


export default function SchedulerTemplatesDemo() {
  useEffect(() => {
    document.title = "DHTMLX React Scheduler | Basic Init";
  }, []);


  const initialData: { events: Event[] } = {
    events:  [
				{ id:1, classname:"blue", start_date: new Date("2025-08-11T02:00:00Z"), end_date: new Date("2025-08-11T10:20:00Z"), text:"Product Strategy Hike" },
				{ id:2, classname:"blue", start_date: new Date("2025-08-11T12:00:00Z"), end_date: new Date("2025-08-11T16:00:00Z"), text:"Agile Meditation and Release" },
				{ id:3, classname:"violet", start_date: new Date("2025-08-12T06:00:00Z"), end_date: new Date("2025-08-12T11:00:00Z"), text:"Tranquil Tea Time" },
				{ id:4, classname:"green", start_date: new Date("2025-08-12T11:30:00Z"), end_date: new Date("2025-08-12T19:00:00Z"), text:"Sprint Review and Retreat" },
				{ id:5, classname:"violet", start_date: new Date("2025-08-13T01:00:00Z"), end_date: new Date("2025-08-13T03:00:00Z"), text:"Kayaking Workshop" },
				{ id:6, classname:"yellow", start_date: new Date("2025-08-13T06:00:00Z"), end_date: new Date("2025-08-13T08:00:00Z"), text:"Stakeholder Sunset Yoga Session" },
				{ id:7, classname:"green", start_date: new Date("2025-08-13T07:00:00Z"), end_date: new Date("2025-08-13T12:00:00Z"), text:"Roadmap Alignment Walk" },
				{ id:8, classname:"violet", start_date: new Date("2025-08-13T13:00:00Z"), end_date: new Date("2025-08-13T18:00:00Z"), text:"Mindful Team Building" },
				{ id:9, classname:"blue", start_date: new Date("2025-08-14T01:00:00Z"), end_date: new Date("2025-08-14T18:00:00Z"), text:"Cross-Functional Expedition" },
				{ id:10, classname:"yellow", start_date: new Date("2025-08-14T14:00:00Z"), end_date: new Date("2025-08-14T20:00:00Z"), text:"User Feedback Picnic" },
				{ id:11, classname:"blue", start_date: new Date("2025-08-15T03:00:00Z"), end_date: new Date("2025-08-15T08:00:00Z"), text:"Demo and Showcase" },
				{ id:12, classname:"yellow", start_date: new Date("2025-08-15T11:00:00Z"), end_date: new Date("2025-08-15T17:00:00Z"), text:"Quality Assurance Spa Day" },
				{ id:13, classname:"violet", start_date: new Date("2025-08-16T01:00:00Z"), end_date: new Date("2025-08-16T03:00:00Z"), text:"Motion Cycling Adventure" },
				{ id:14, classname:"blue", start_date: new Date("2025-08-16T10:00:00Z"), end_date: new Date("2025-08-16T16:00:00Z"), text:"Competitor Analysis Beach Day" },
				{ id:15, classname:"blue", start_date: new Date("2025-08-17T02:00:00Z"), end_date: new Date("2025-08-17T06:00:00Z"), text:"Creativity Painting Retreat" }
			]
  };

  const config: SchedulerConfig = {
    // first_hour: 8,
    // last_hour: 20,
    time_step: 15
  };

  const templates: SchedulerTemplates = {
    event_class: (start, end, event) => {
      return event.classname || '' ;
    }
  };
  


  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactScheduler
        events={initialData.events}
        date={new Date("2025-08-15T00:00:00Z")}
        view={"week"}
        templates={templates}
        config={config}
      />
    </div>
  );
};