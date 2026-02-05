import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/trial-react-gantt";
import "@dhx/trial-react-gantt/dist/react-gantt.css";
import CustomLightbox from "./EditorModal";

export default function BasicInitDemo() {
  const ganttRef = useRef(null);

  useEffect(() => {
    document.title = "DHTMLX React Gantt | Custom Form";
  }, []);

  const tasks = [
    { id: 1, text: "Office itinerancy", type: "project", progress: 0.4, open: true, start_date: "02-04-2025 00:00", duration: 17, parent: 0 },
    { id: 2, text: "Office facing", type: "project", start_date: "02-04-2025 00:00", duration: 5, progress: 0.6, parent: 1, open: true },
    { id: 5, text: "Interior office", type: "task", start_date: "02-04-2025 00:00", duration: 3, parent: 2, progress: 0.6, open: true },
    { id: 6, text: "Air conditioners check", type: "task", start_date: "05-04-2025 00:00", duration: 2, parent: 2, progress: 0.29, open: true },
    { id: 3, text: "Furniture installation", type: "project", start_date: "08-04-2025 00:00", duration: 2, parent: 1, progress: 0.6, open: false },
    { id: 7, text: "Workplaces preparation", type: "task", start_date: "08-04-2025 00:00", duration: 2, parent: 3, progress: 0.6, open: true }
  ];
  const links = [
    { id: 1, source: "2", target: "3", type: "0" },
  ];

  useEffect(() => {
    //const gantt = ganttRef.current?.instance;
    
  }, []);

  return (
    <div className="demo-container">
      <title>DHTMLX React Gantt | Custom Edit Form</title>
      <ReactGantt 
        ref={ganttRef}
        tasks={tasks}
        links={links}
        customLightbox={<CustomLightbox />} />
    </div>
  );
}