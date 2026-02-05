import { useEffect, useRef, useState } from 'react';
import ReactScheduler, {SchedulerStatic, Event, SchedulerConfig, ReactSchedulerRef, ReactSchedulerProps} from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";
import Button from '@mui/material/Button';
import { initialData } from "./demoData";


export default function ExportDataDemo() {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  useEffect(() => {
    document.title = "DHTMLX React Scheduler | Export";
  }, []);

  const plugins = {
    export_api: true
  };

  const handleExport = (exportType:string) => {
    const scheduler = schedulerRef.current?.instance;
    if(!scheduler) return;

    switch (exportType) {
      case "pdf":
        scheduler.exportToPDF();
        break;
      case "png":
        scheduler.exportToPNG();
        break;
    }    
  }

  const exportPDF = () => {
    handleExport("pdf")
  }
  const exportPNG = () => {
    handleExport("png")
  }


  const config: SchedulerConfig = {
    
  };

  const data: ReactSchedulerProps["data"] = {
    save: (action, entity, id, data) => {
      console.log(action, entity, id, data);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 10px 20px', gap: '10px' }}>
        <Button variant="contained" onClick={exportPDF}>Export To PDF</Button>
        <Button variant="contained" onClick={exportPNG}>Export To PNG</Button>
     </div>

      <ReactScheduler
        plugins={plugins}
        events={initialData.events}
        date={new Date("2025-08-15T00:00:00Z")}
        ref={schedulerRef}
        config={config}
        data={data}
      />
    </div>
  );
};