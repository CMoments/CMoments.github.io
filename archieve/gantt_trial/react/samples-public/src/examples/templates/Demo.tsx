import { useEffect, useRef, useState, useMemo } from 'react';
import ReactGantt, {GanttStatic, Task, Link, GanttConfig, ReactGanttRef, OnBeforeTaskDeleteConfirmArgs, GanttTemplates, ReactGanttProps, useWorkTime} from "@dhx/trial-react-gantt";
import "@dhx/trial-react-gantt/dist/react-gantt.css";

import Button from '@mui/material/Button';

import { initialData } from "./demoData";
import TaskTextComponent from "./components/TaskText";
import StatusButtonComponent from "./components/StatusButton";
import ColumnMenu from "./components/HeaderMenu";
import BeforeTaskDeleteDialog from "./components/TaskDeleteDialog";

import "./styles.css";

export default function GanttTemplatesDemo() {
  const ganttRef = useRef<ReactGanttRef>(null);
  const { isWorkTime }= useWorkTime(ganttRef);
  useEffect(() => {
    document.title = "DHTMLX React Gantt | Configs & Templates";
  }, []);

  const [theme, setTheme] = useState<string>("terrace");
  const [locale, setLocale] = useState<string>("en");


  const [showTaskDeleteDialog, setShowTaskDeleteDialog] = useState(false);
  const [pendingTaskDelete, setPendingTaskDelete] = useState<null | {
    message: string;
    callback: () => void;
  }>(null);

  const handleDeleteTaskConfirm: (args: OnBeforeTaskDeleteConfirmArgs) => void = ({
    task,
    message,
    callback
  }) => {
    setPendingTaskDelete({ message: `Are you sure want to delete ${task.text}?`, callback });
    setShowTaskDeleteDialog(true);
  } ;


  function onDialogOption(result: boolean) {
    if (result && pendingTaskDelete?.callback) {
      pendingTaskDelete.callback();
    }
    closeDialog();
  }

  function closeDialog() {
    setShowTaskDeleteDialog(false);
    setPendingTaskDelete(null);
  }

  const [filterLabel, setFilterLabel] = useState("All");

  const [filter, setFilter] = useState<((task: Task) => boolean) | null>(null);

  function handleFilterSelected(filterType: string) {
    if (filterType === "done") {
      setFilterLabel("Done");
      setFilter(() => (task: Task) => !!task.completed);
    } else if (filterType === "notDone") {
      setFilterLabel("Not Done");
      setFilter(() => (task: Task) => !task.completed);
    } else {
      setFilterLabel("All");
      setFilter(null);
    }
  }

  const switchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "terrace" ? "dark" : "terrace"));
  };

  const switchLocale = () => {
    setLocale((prevLocale) => (prevLocale === "en" ? "es" : "en"));
  };

  const collapseAll = () => {
    const gantt = ganttRef.current?.instance;
    if(!gantt) return;
    gantt.eachTask((task: Task) => {
      task.$open = false;
    });
    gantt.render();
  }
  const expandAll = () => {
    const gantt = ganttRef.current?.instance;
    if(!gantt) return;
    gantt.eachTask((task: Task) => {
      task.$open = true;
    });
    gantt.render();
  }
  const handlerTaskTextClick = () => {
    console.log("Button clicked!");
  };

  const toggleCompleted = (task: Task) => {
    task.completed = !task.completed;
  };

  const templates: GanttTemplates = useMemo(() => ({
    task_text: (start: Date, end: Date, task: Task) => {
      return <TaskTextComponent task={task} onClick={handlerTaskTextClick} />;
    },
    scale_cell_class: (date: Date) => {
      return isWorkTime({date}) ? "" : "weekend";
    },
    timeline_cell_class: (task: Task, date: Date) => {
      return isWorkTime({date, task}) ? "" : "weekend";
    }
  
  }), []);
  const config: GanttConfig = useMemo(() => ({
      scales: [
        { unit: "year", step: 1, format: "%Y" },
        { unit: "month", step: 1, format: "%F, %Y" },
        { unit: "day", step: 1, format: "%d %M" },
      ],
      columns: [
        {
          name: "text",
          tree: true,
          width: 180,
          resize: true
        },
        { name: "start_date", width: 150, align: "center", resize: true },
        { name: "duration", width: 80, align: "center", resize: true },

        {
          name: "custom",
          align: "center",
          label: <ColumnMenu
                key={filterLabel}
                onFilterSelected={handleFilterSelected}
                currentFilterLabel={filterLabel}
              />
          ,
          width: 160,
          template: (task: Task) => (
            <StatusButtonComponent
              task={task}
              onClick={() => {
                toggleCompleted(task);
                ganttRef.current?.instance?.updateTask(task.id);
              }}
            />
          ),
          resize: true,
        },
        { name: "add", width: 44 },
      ],
      work_time: true,
      row_height: 50,
      scale_height: 90
    }), [filterLabel]);


  const dataCallback: ReactGanttProps["data"] = {
    save: (action, entity, id, data) => {
      console.log(action, entity, id, data);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 10px 20px', gap: '10px' }}>
       
          <Button variant="contained" onClick={() => switchTheme()}>Switch Theme</Button>
          <Button variant="contained" onClick={() => switchLocale()}>Switch Locale</Button>
          <Button variant="contained" onClick={() => collapseAll()}>Collapse All</Button>
          <Button variant="contained" onClick={() => expandAll()}>Expand All</Button>
        
      </div>

      <BeforeTaskDeleteDialog
        open={showTaskDeleteDialog}
        text={pendingTaskDelete?.message || ""}
        onConfirm={() => onDialogOption(true)}
        onCancel={() => onDialogOption(false)}
      />

      <ReactGantt
        tasks={initialData.tasks}
        links={initialData.links}
        templates={templates}
        config={config}
        theme={theme}
        locale={locale}
        ref={ganttRef}
        filter={filter}
        modals={{
          onBeforeTaskDelete: handleDeleteTaskConfirm,
        }}
        data={dataCallback}
      />
    </div>
  );
};