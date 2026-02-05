import { useEffect, useRef, useState } from 'react';
import ReactGantt, {GanttStatic, Task, Link, GanttConfig, ReactGanttRef, ReactGanttProps} from "@dhx/trial-react-gantt";
import "@dhx/trial-react-gantt/dist/react-gantt.css";
import Button from '@mui/material/Button';
import { initialData } from "./demoData";


export default function ExportDataDemo() {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    document.title = "DHTMLX React Gantt | Export";
  }, []);

  const plugins = {
    export_api: true
  };

  const handleExport = (exportType:string) => {
    const gantt = ganttRef.current?.instance;
    if(!gantt) return;

    switch (exportType) {
      case "pdf":
        gantt.exportToPDF();
        break;
      case "png":
        gantt.exportToPNG();
        break;
      case "excel":
        gantt.exportToExcel({
          visual: "base-colors"
        });
        break;
      case "msp":
        gantt.exportToMSProject();
        break;
      case "p6":
        gantt.exportToPrimaveraP6();
        break;
    }    
  }

  const exportPDF = () => {
    handleExport("pdf")
  }
  const exportPNG = () => {
    handleExport("png")
  }
  const exportExcel = () => {
    handleExport("excel")
  }
  const exportMSP = () => {
    handleExport("msp")
  }
  const exportPrimavera = () => {
    handleExport("p6")
  }


  const config: GanttConfig = {
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%F, %Y" },
      { unit: "day", step: 1, format: "%d %M" },
    ],
    scale_height: 60
  };

  const data: ReactGanttProps["data"] = {
    save: (action, entity, id, data) => {
      console.log(action, entity, id, data);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 10px 20px', gap: '10px' }}>
        <Button variant="contained" onClick={exportPDF}>Export To PDF</Button>
        <Button variant="contained" onClick={exportPNG}>Export To PNG</Button>
        <Button variant="contained" onClick={exportExcel}>Export To Excel</Button>
        <Button variant="contained" onClick={exportMSP}>Export To MSP</Button>
     </div>

      <ReactGantt
        plugins={plugins}
        tasks={initialData.tasks}
        links={initialData.links}
        ref={ganttRef}
        config={config}
        data={data}
      />
    </div>
  );
};