import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ReactGantt, { ReactGanttRef, Task, Link } from "@dhx/trial-react-gantt";
import "@dhx/trial-react-gantt/dist/react-gantt.css";

import { useOutletContext } from 'react-router-dom';
import type { GanttEditorContext } from './GanttEditorViewDemo';

export default function BasicInitDemo() {
  const ganttRef = React.useRef<ReactGanttRef>(null);

  useEffect(() => {
    document.title = "DHTMLX React Gantt | Custom Edit View";
  }, []);

  const navigate = useNavigate();

  const { tasks, links, handleSaveTask, handleDeleteTask, createTask } = useOutletContext<GanttEditorContext>();


  const data = {
    save: (entity: string, action: string, raw: any, id: string | number) => {
      if (entity === 'task') {
        if (action === 'update') {
          handleSaveTask(raw);
        } else if (action === 'create') {
          createTask(raw);
        } else if (action === 'delete') {
          handleDeleteTask(String(id));
        }
      }
    }
  };

  function handleTaskCreated(ganttTask: Task) {
    ganttTask.$new = true;
    createTask(ganttTask); 
    navigate(`editor/${ganttTask.id}`);
    return false;
  }

  function handleEditTask(taskId: string|number) {
    navigate(`editor/${taskId}`);
    return false;
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactGantt
        ref={ganttRef}
        tasks={tasks}
        links={links}
        data={data}
        onTaskCreated={handleTaskCreated}
        onBeforeLightbox={handleEditTask}
      />
    </div>
  );
}
