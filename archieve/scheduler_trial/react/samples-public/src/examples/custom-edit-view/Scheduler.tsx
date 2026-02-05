import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ReactScheduler, { ReactSchedulerRef, Event } from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";

import { useOutletContext } from 'react-router-dom';
import type { SchedulerEditorContext } from './SchedulerEditorViewDemo';

export default function BasicInitDemo() {
  const schedulerRef = React.useRef<ReactSchedulerRef>(null);

  useEffect(() => {
    document.title = "DHTMLX React Scheduler | Custom Edit View";
  }, []);

  const navigate = useNavigate();

  const { events, handleSaveEvent, handleDeleteEvent, createEvent } = useOutletContext<SchedulerEditorContext>();


  const data = {
    save: (entity: string, action: string, raw: any, id: string | number) => {
      if (entity === 'event') {
        if (action === 'update') {
          handleSaveEvent(raw);
        } else if (action === 'create') {
          createEvent(raw);
        } else if (action === 'delete') {
          handleDeleteEvent(String(id));
        }
      }
    }
  };

  function handleEventCreated(schedulerEvent: Event) {
    createEvent(schedulerEvent); 
    navigate(`editor/${schedulerEvent.id}`);
    return false;
  }

  function handleEditEvent(eventId: string|number) {
    navigate(`editor/${eventId}`);
    return false;
  }

  function beforeLightbox(eventId: string | number) {
    const ev = schedulerRef.current?.instance?.getEvent(eventId);
    if (ev.$new) {
      handleEventCreated(ev);
    } else {
      handleEditEvent(eventId);
    }
    return false;
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactScheduler
        ref={schedulerRef}
        events={events}
        date={new Date("2025-08-15T00:00:00Z")}
        data={data}
      
        onBeforeLightbox={beforeLightbox}
      />
    </div>
  );
}
