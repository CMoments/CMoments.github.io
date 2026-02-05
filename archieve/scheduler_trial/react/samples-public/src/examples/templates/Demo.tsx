import { useEffect, useRef, useState, useMemo } from 'react';
import ReactScheduler, { OnBeforeEventDeleteConfirmArgs, Event, Marker, SchedulerConfig, SchedulerTemplates, ReactSchedulerProps } from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";

import Button from "@mui/material/Button";
import BeforeEventDeleteDialog from "./components/EventDeleteDialog";
import EventTextBox from "./components/EventTextBox";
import { initialData } from "./demoData";
import "./styles.css";

export default function SchedulerTemplatesDemo() {
  const schedulerRef = useRef<any>(null);
  useEffect(() => {
    document.title = "DHTMLX React Scheduler | Configs & Templates";
  }, []);

  const [theme, setTheme] = useState<string>("terrace");
  const [locale, setLocale] = useState<string>("en");


  const [showEventDeleteDialog, setShowEventDeleteDialog] = useState(false);
  const [pendingEventDelete, setPendingEventDelete] = useState<null | {
    message: string;
    callback: () => void;
  }>(null);

  const handleDeleteEventConfirm: (args: OnBeforeEventDeleteConfirmArgs) => void = ({
    event,
    message,
    callback
  }) => {
    setPendingEventDelete({ message: `Are you sure want to delete ${event.text}?`, callback });
    setShowEventDeleteDialog(true);
  };


  function onDialogOption(result: boolean) {
    if (result && pendingEventDelete?.callback) {
      pendingEventDelete.callback();
    }
    closeDialog();
  }

  function closeDialog() {
    setShowEventDeleteDialog(false);
    setPendingEventDelete(null);
  }

  const [markers, setMarkers] = useState<Marker[]>([
    { // block each Saturday and Sunday
      days: [0, 6],
      zones: "fullday",
      type: "dhx_time_block",
      css: "disabled-day"
    },
    {
      days: [1, 2, 3, 4, 5],
      zones: [0, 8 * 60, 20 * 60, 24 * 60],
      type: "dhx_time_block",
      css: "disabled-day" // the name of applied CSS class
    },
    {
      days: [1, 2, 3, 4, 5],
      zones: [13 * 60, 14 * 60],
      type: "dhx_time_block",
      css: "disabled-day",
      html: "<div class='dhx_time_block_text'>Lunch break</div>"
    },
  ]);

  const switchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "terrace" ? "dark" : "terrace"));
  };

  const switchLocale = () => {
    setLocale((prevLocale) => (prevLocale === "en" ? "es" : "en"));
  };

  const templates: SchedulerTemplates = useMemo(() => ({
    event_class: (start, end, event) => {
      return ("templates-" + event.classname) || '';
    },
    event_text: (start, end, event) => {
      return <EventTextBox event={event} />;
    }
  }), []);

  const config: SchedulerConfig = useMemo(() => ({
    first_hour: 6,
    last_hour: 22,
    hour_size_px: 60,
    mark_now: false
  }), []);


  const dataCallback: ReactSchedulerProps["data"] = {
    save: (action, entity, id, data) => {
      console.log(action, entity, id, data);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 10px 20px', gap: '10px' }}>

        <Button variant="contained" onClick={() => switchTheme()}>Switch Theme</Button>
        <Button variant="contained" onClick={() => switchLocale()}>Switch Locale</Button>

      </div>

      <BeforeEventDeleteDialog
        open={showEventDeleteDialog}
        text={pendingEventDelete?.message || ""}
        onConfirm={() => onDialogOption(true)}
        onCancel={() => onDialogOption(false)}
      />

      <ReactScheduler
        date={new Date("2025-07-28T00:00:00Z")}
        events={initialData.events}
        markers={markers}
        templates={templates}
        config={config}
        theme={theme}
        locale={locale}
        ref={schedulerRef}


        modals={{
          onBeforeEventDelete: handleDeleteEventConfirm,
        }}
        data={dataCallback}
      />
    </div>
  );
};