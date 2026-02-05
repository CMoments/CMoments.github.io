import React, {useRef, useEffect} from "react";

import Divider from '@mui/material/Divider';
import ButtonGroup from '@mui/material/ButtonGroup';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

import Button from '@mui/material/Button';

import { useDispatch, useSelector } from "react-redux";
import ReactGantt, {
  GanttConfig,
  GanttPlugins,
  ReactGanttProps,
  SerializedTask,
  Task,
  Link,
  ReactGanttRef
} from "@dhx/trial-react-gantt";
import "@dhx/trial-react-gantt/dist/react-gantt.css";

import {
  updateTask,
  createTask,
  deleteTask,
  updateLink,
  createLink,
  deleteLink,
  updateConfig,
} from "../../redux/ganttSlice";

import type { RootState, AppDispatch } from "../../redux/store";

type ZoomLevel = "day" | "month" | "year";

const ReactGanttExample: React.FC = () => {
  const ganttRef = useRef<ReactGanttRef>(null);
  const dispatch = useDispatch<AppDispatch>();

  const tasks = useSelector<RootState, SerializedTask[]>((state) => state.gantt.tasks);
  const links = useSelector<RootState, Link[]>((state) => state.gantt.links);
  const config = useSelector<RootState, GanttConfig>(
    (state) => state.gantt.config
  );

  useEffect(() => {
    document.title = "DHTMLX React Gantt | Redux Toolkit";
  }, []);

  const handleZoomIn = (newZoom: ZoomLevel) => {
    dispatch(
      updateConfig({
        ...config,
        zoom: {
          ...config.zoom,
          current: newZoom,
        },
      })
    );
  };

  const handleUndo = () => {
    ganttRef.current?.instance?.undo();
  };
  const handleRedo = () => {
    ganttRef.current?.instance?.redo();
  }

  const plugins: GanttPlugins = {
    undo: true,
  };

  const ganttConfig: GanttConfig = {
    ...config,
  };

  const templates: ReactGanttProps["templates"] = {
    format_date: (date: Date) => date.toISOString(),
    parse_date: (date: string) => new Date(date),
  };

  const data: ReactGanttProps["data"] = {
    save: (entity, action, payload, id) => {
      if (entity === "task") {
        if (action === "update") {
          dispatch(updateTask(payload as Task));
        } else if (action === "create") {
          dispatch(createTask(payload as Task));
        } else if (action === "delete") {
          dispatch(deleteTask(String(id)));
        }
      } else if (entity === "link") {
        if (action === "update") {
          dispatch(updateLink(payload as Link));
        } else if (action === "create") {
          dispatch(createLink(payload as Link));
        } else if (action === "delete") {
          dispatch(deleteLink(String(id)));
        }
      }
    },
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'start', padding: '10px 10px 20px', gap: '10px' }}>
        
        <ButtonGroup>
          <Button onClick={() => handleUndo()}><UndoIcon/></Button>
          <Button onClick={() => handleRedo()}><RedoIcon/></Button>
        </ButtonGroup>
        <Divider orientation="vertical"></Divider>
        <ButtonGroup>
          <Button onClick={() => handleZoomIn("day")}>Day</Button>
          <Button onClick={() => handleZoomIn("month")}>Month</Button>
          <Button onClick={() => handleZoomIn("year")}>Year</Button>
        </ButtonGroup>

      </div>

      <ReactGantt
        tasks={tasks}
        links={links}
        config={ganttConfig}
        templates={templates}
        plugins={plugins}
        data={data}
        ref={ganttRef}
      />
    </div>
  );
};

export default ReactGanttExample;