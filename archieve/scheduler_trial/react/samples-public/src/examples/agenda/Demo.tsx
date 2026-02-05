import React, { useEffect, useRef, useState } from 'react';
import ReactScheduler, { Event, SchedulerConfig, SchedulerTemplates, SchedulerPlugins } from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";
import "./styles.css"


export default function SchedulerAgendaDemo() {
  useEffect(() => {
    document.title = "DHTMLX React Scheduler | List View";
  }, []);


  const initialData: { events: Event[] } = {
    events:  [
				{ id: 1, classname: "blue", start_date: new Date("2025-04-15T02:00:00"), end_date: new Date("2025-04-15T10:20:00"), text: "Product Strategy Hike" },
				{ id: 2, classname: "yellow", start_date: new Date("2025-04-15T11:00:00"), end_date: new Date("2025-04-15T13:00:00"), text: "Innovation Brainstorming" },
				{ id: 3, classname: "violet", start_date: new Date("2025-04-16T08:00:00"), end_date: new Date("2025-04-16T10:30:00"), text: "Leadership Workshop" },
				{ id: 4, classname: "green", start_date: new Date("2025-04-16T12:00:00"), end_date: new Date("2025-04-17T14:00:00"), text: "Market Analysis Seminar" },
				{ id: 5, classname: "blue", start_date: new Date("2025-04-17T09:00:00"), end_date: new Date("2025-04-17T11:00:00"), text: "Team Efficiency Meeting" },
				{ id: 6, classname: "yellow", start_date: new Date("2025-04-17T15:00:00"), end_date: new Date("2025-04-17T17:30:00"), text: "Client Engagement Forum" },
				{ id: 7, classname: "violet", start_date: new Date("2025-04-18T10:00:00"), end_date: new Date("2025-04-18T12:00:00"), text: "Sales Strategy Session" },
				{ id: 8, classname: "green", start_date: new Date("2025-04-18T14:00:00"), end_date: new Date("2025-04-19T16:00:00"), text: "Corporate Culture Workshop" },
				{ id: 9, classname: "blue", start_date: new Date("2025-04-19T08:00:00"), end_date: new Date("2025-04-19T10:00:00"), text: "Brand Development Talk" },
				{ id: 10, classname: "yellow", start_date: new Date("2025-04-20T11:00:00"), end_date: new Date("2025-04-20T13:30:00"), text: "Financial Planning Discussion" },
				{ id: 11, classname: "violet", start_date: new Date("2025-04-21T09:00:00"), end_date: new Date("2025-04-21T11:00:00"), text: "Digital Marketing Insights" },
				{ id: 12, classname: "green", start_date: new Date("2025-04-21T14:00:00"), end_date: new Date("2025-04-22T15:00:00"), text: "Project Management Training" },
				{ id: 13, classname: "blue", start_date: new Date("2025-04-22T08:00:00"), end_date: new Date("2025-04-22T10:00:00"), text: "Agile Methodologies Review" },
				{ id: 14, classname: "yellow", start_date: new Date("2025-04-23T11:00:00"), end_date: new Date("2025-04-23T13:00:00"), text: "Customer Experience Strategies" },
				{ id: 15, classname: "violet", start_date: new Date("2025-04-24T09:00:00"), end_date: new Date("2025-04-24T16:00:00"), text: "Business Process Optimization" },
				{ id: 16, classname: "green", start_date: new Date("2025-04-25T10:00:00"), end_date: new Date("2025-04-25T12:00:00"), text: "Risk Management Techniques" },
				{ id: 17, classname: "blue", start_date: new Date("2025-04-26T08:00:00"), end_date: new Date("2025-04-26T10:30:00"), text: "Operational Efficiency Workshop" },
				{ id: 18, classname: "yellow", start_date: new Date("2025-04-27T13:00:00"), end_date: new Date("2025-04-28T14:00:00"), text: "Human Resources Best Practices" },
				{ id: 19, classname: "violet", start_date: new Date("2025-04-28T09:00:00"), end_date: new Date("2025-04-28T17:00:00"), text: "Organizational Change Management" },
				{ id: 20, classname: "green", start_date: new Date("2025-04-29T08:00:00"), end_date: new Date("2025-04-29T12:00:00"), text: "Effective Communication Skills" },
				{ id: 21, classname: "blue", start_date: new Date("2025-04-29T14:00:00"), end_date: new Date("2025-04-29T16:00:00"), text: "Innovative Thinking Workshop" },
				{ id: 22, classname: "yellow", start_date: new Date("2025-04-30T10:00:00"), end_date: new Date("2025-04-30T12:00:00"), text: "Data-Driven Decision Making" },
				{ id: 23, classname: "violet", start_date: new Date("2025-05-01T09:00:00"), end_date: new Date("2025-05-01T11:00:00"), text: "Strategic Leadership Forum" },
				{ id: 24, classname: "green", start_date: new Date("2025-05-02T13:00:00"), end_date: new Date("2025-05-02T15:00:00"), text: "Building High-Performance Teams" },
				{ id: 25, classname: "blue", start_date: new Date("2025-05-03T08:00:00"), end_date: new Date("2025-05-03T10:30:00"), text: "Global Market Trends Analysis" },
				{ id: 26, classname: "yellow", start_date: new Date("2025-05-04T15:00:00"), end_date: new Date("2025-05-04T17:00:00"), text: "Customer Journey Mapping" },
				{ id: 27, classname: "violet", start_date: new Date("2025-05-06T10:00:00"), end_date: new Date("2025-05-06T12:00:00"), text: "Productivity Hacks Seminar" },
				{ id: 28, classname: "green", start_date: new Date("2025-05-07T09:00:00"), end_date: new Date("2025-05-07T11:00:00"), text: "Time Management Techniques" },
				{ id: 29, classname: "blue", start_date: new Date("2025-05-08T14:00:00"), end_date: new Date("2025-05-08T16:00:00"), text: "Effective Negotiation Skills" },
				{ id: 30, classname: "yellow", start_date: new Date("2025-05-09T11:00:00"), end_date: new Date("2025-05-09T13:00:00"), text: "Creative Problem-Solving" },
				{ id: 31, classname: "violet", start_date: new Date("2025-05-11T09:00:00"), end_date: new Date("2025-05-11T12:00:00"), text: "Social Media Marketing Workshop" },
				{ id: 32, classname: "green", start_date: new Date("2025-05-12T10:00:00"), end_date: new Date("2025-05-12T15:00:00"), text: "Business Intelligence Insights" },
				{ id: 33, classname: "blue", start_date: new Date("2025-05-14T08:00:00"), end_date: new Date("2025-05-14T10:00:00"), text: "Corporate Social Responsibility" },
				{ id: 34, classname: "yellow", start_date: new Date("2025-05-15T13:00:00"), end_date: new Date("2025-05-15T16:00:00"), text: "Emerging Technologies Conference" },
				{ id: 35, classname: "violet", start_date: new Date("2025-05-17T09:00:00"), end_date: new Date("2025-05-17T11:00:00"), text: "Branding and Identity Design" },
				{ id: 36, classname: "green", start_date: new Date("2025-05-18T12:00:00"), end_date: new Date("2025-05-18T14:00:00"), text: "Financial Forecasting Session" },
				{ id: 37, classname: "blue", start_date: new Date("2025-05-20T08:00:00"), end_date: new Date("2025-05-20T10:30:00"), text: "Stakeholder Engagement Meeting" },
				{ id: 38, classname: "yellow", start_date: new Date("2025-05-21T15:00:00"), end_date: new Date("2025-05-21T17:00:00"), text: "Change Management Strategies" },
				{ id: 39, classname: "violet", start_date: new Date("2025-05-23T10:00:00"), end_date: new Date("2025-05-23T12:00:00"), text: "Digital Transformation Symposium" },
				{ id: 40, classname: "green", start_date: new Date("2025-05-24T14:00:00"), end_date: new Date("2025-05-24T16:00:00"), text: "Sustainable Business Practices" }

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

  const views = {
    agenda: {
      date: {
        start: (date: Date) => {
          // agenda will show events from the start of the month one month ahead
          return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
        },
        add: (date: Date, step: number) => {
          // navigation buttons will move it to the next/prev month
          return new Date(date.getFullYear(), date.getMonth() + 1*step, 1, 0, 0, 0, 0);
        }
      }
    }
  }
  
  const plugins: SchedulerPlugins = {
    agenda_view: true
  };


  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactScheduler
        events={initialData.events}
        date={new Date("2025-04-01T00:00:00Z")}
        view={"agenda"}
        views={views}
        templates={templates}
        config={config}
        plugins={plugins}
      />
    </div>
  );
};