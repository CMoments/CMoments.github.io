import React, { useRef, useEffect, useState } from 'react';
import ReactGantt, { ReactGanttRef, GanttTemplates, Task, ResourceItem, useWorkTime, GanttConfig } from '@dhx/trial-react-gantt';

import { useResourceHistogram } from './hooks/useResourceHistogram';
import { useResourceAssignments, useGanttDatastore } from '@dhx/trial-react-gantt';
import ResourceSelectDropdown from './ResourceSelectDropdown';
import demoData from './demoData';
import './styles.css';

export default function ResourceHistogramGantt(props: any) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    document.title = "DHTMLX React Gantt | Resource Panel";
  }, []);

  const { tasks, links, resources } = demoData;
  const [resourceFilter, setResourceFilter ] = useState<((res: any) => boolean)|null>(null);
  const [selectedResource, setSelectedResource ] = useState<string | null>(null);

  const { isWorkTime, calculateDuration } = useWorkTime(ganttRef);
  const { getResourceAssignments } = useResourceAssignments(ganttRef);
  const { getItem: getTask } = useGanttDatastore<Task>(ganttRef, "task");
  const { getItem: getResource, hasChild: resourceHasChild, getChildren: getResourceChildren } = useGanttDatastore<ResourceItem>(ganttRef, "resource");

  const { getAllocatedValue, getCapacity, isGroupResource } = useResourceHistogram(ganttRef);

  const templates: GanttTemplates = {
    timeline_cell_class: (task, date) => {
      return isWorkTime({ date, task }) ? '' : 'week_end';
    },

    histogram_cell_class: (start, _end, resource, tasks) => {
      const allocated = getAllocatedValue(tasks, resource);
      const cap = getCapacity(start, resource);
      return allocated > cap ? 'column_overload' : '';
    },

    histogram_cell_label: (start, _end, resource, tasks) => {
      if (isGroupResource(resource)) return '';
      const allocated = getAllocatedValue(tasks, resource);
      const cap = getCapacity(start, resource);
      return tasks.length ? `${allocated}/${cap}` : '–';
    },

    histogram_cell_allocated: (start, _end, resource, tasks) => {
      return getAllocatedValue(tasks, resource);
    },

    histogram_cell_capacity: (start, _end, resource) => {
      if (!isWorkTime({ date: start })) return 0;
      return getCapacity(start, resource);
    },

    grid_row_class: (_, __, resource) => {
      if (isGroupResource(resource)) return 'folder_row group_row';
      return '';
    },
    task_row_class: (_, __, resource) => {
      if (isGroupResource(resource)) return 'group_row';
      return '';
    },
  };

  const resourceTemplates: GanttTemplates = {

  };

  const resourceConfig: GanttConfig = {
    scale_height: 30,
    row_height: 45,
    scales: [
      { unit: "day", step: 1, date: "%d %M" }
    ],
    columns: [
      {
        name: "name", label: "Name", tree: true, width: 200, template: function (resource) {
          return resource.text;
        }, resize: true
      },
      {
        name: "progress", label: "Complete", align: "center", template: function (resource) {
          let totalToDo = 0,
            totalDone = 0;

          const assignments = getResourceAssignments(resource.id);

          assignments.forEach(function (assignment) {
            const task = getTask(assignment.task_id);
            totalToDo += (task.duration || 1);
            totalDone += (task.duration || 1) * (task.progress || 0);
          });

          let completion = 0;
          if (totalToDo) {
            completion = (totalDone / totalToDo) * 100;
          }

          return Math.floor(completion) + "%";
        }, resize: true
      },
      {
        name: "workload", label: "Workload", align: "center", template: function (resource) {

          let totalDuration = 0;

          const assignments = getResourceAssignments(resource.id);
          assignments.forEach(function (assignment) {
            const task = getTask(assignment.task_id);
            totalDuration += Number(assignment.value) * (task.duration || 1);
          });

          return (totalDuration || 0) + "h";

        }, resize: true
      },

      {
        name: "capacity", label: "Capacity", align: "center", template: function (resource) {
          const gantt = ganttRef.current?.instance;
          if (!gantt) return;
          const n = resourceHasChild(resource.id) ? getResourceChildren(resource.id).length : 1

          const state = gantt.getState();

          return gantt.calculateDuration(state.min_date, state.max_date) * n * 8 + "h";
        }
      }

    ]
  };

  function handleResourceSelectChange(resourceId: string | null) {

    setSelectedResource(resourceId);
    if(resourceId === null){
      setResourceFilter(null);
    }else{
      setResourceFilter(() => (resource: ResourceItem) => String(resource.id) === String(resourceId));
    }
  }

  const config = {
    // columns in the main grid
    columns: [
      { name: 'text', tree: true, width: 200, resize: true },
      { name: 'start_date', align: 'center', width: 100, resize: true },
      {
        name: 'owner', align: 'center', width: 75, label: 'Owner',
        template: (task: Task) => {
          const gantt = ganttRef.current?.instance;
          if (!gantt) return '';
          if (task.type === gantt.config.types.project) return '';

          const resources = gantt.getTaskResources(task.id) || [];
          if (!resources.length) {
            return 'Unassigned';
          } else if (resources.length === 1) {
            return resources[0].text;
          } else {
            return resources.map((r: any) =>
              `<div class='owner-label' title='${r.text}'>${r.text.charAt(0)}</div>`
            ).join('');
          }
        },
        resize: true
      },
      { name: 'duration', width: 60, align: 'center', resize: true },
      { name: 'add', width: 44 }
    ],

    // resource-related config for Resource Diagram + Histogram
    resources: true,
    resource_store: 'resource',
    resource_property: 'owner',
    resource_render_empty_cells: true,
    order_branch: true,
    open_tree_initially: true,

    // sample lightbox sections
    lightbox: {
      sections: [
        { name: 'description', height: 38, map_to: 'text', type: 'textarea', focus: true },
        { name: 'resources', label: "Resources", type: 'resources', map_to: 'auto', default_value: 8 },
        { name: 'time', type: 'duration', map_to: 'auto' }
      ]
    },

    layout: {
      css: "gantt_container",
      rows: [
        {
          gravity: 2,
          cols: [
            { view: "grid", group: "grids", scrollY: "scrollVer" },
            { resizer: true, width: 1 },
            { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
            { view: "scrollbar", id: "scrollVer", group: "vertical" }
          ]
        },
        { resizer: true, width: 1, next: "resources" },
        {
          height: 60,
          cols: [
            { html: <ResourceSelectDropdown 
              resources={resources}
              initialValue={selectedResource}
              onChange={handleResourceSelectChange}
              />, css: "resource-select-panel", group: "grids", id: "resourceSelectDropdown" },
            { resizer: true, width: 1 },
            { html: "" }
          ]
        },

        {
          gravity: 1,
          id: "resources",
          config: resourceConfig,
          templates: resourceTemplates,
          cols: [
            { view: "resourceGrid", group: "grids", scrollY: "resourceVScroll" },
            { resizer: true, width: 1 },
            { view: "resourceHistogram", capacity: 24, scrollX: "scrollHor", scrollY: "resourceVScroll" },
            { view: "scrollbar", id: "resourceVScroll", group: "vertical" }
          ]
        },
        { view: "scrollbar", id: "scrollHor" }
      ]
    }

  };



  return (
    <ReactGantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
      resources={resources}
      resourceFilter={resourceFilter}
      config={config}
      templates={templates}
      plugins={{ auto_scheduling: true }}
    />
  );
}
