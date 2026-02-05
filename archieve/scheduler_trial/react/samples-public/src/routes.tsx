import { createHashRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import BasicInit from './examples/basic-init/Demo';
import CustomForm from './examples/custom-form/Demo';
import CustomEditView from './examples/custom-edit-view/SchedulerEditorViewDemo';
import SchedulerView from './examples/custom-edit-view/Scheduler';
import EditorView from './examples/custom-edit-view/EventEditor';

import ExportData from './examples/export-data/Demo';
import SchedulerTemplatesDemo from './examples/templates/Demo';

import RecurringEventsDemo from './examples/recurring-events/Demo';
import UnitsViewDemo from './examples/units/Demo';
import TimelineViewDemo from './examples/timeline/Demo';
import ReduxToolkit from './examples/redux-toolkit/Demo';
import Zustand from './examples/zustand-basic/Demo';
import AgendaDemo from './examples/agenda/Demo';
import Mobx from './examples/mobx-basic/Demo';
import Jotai from './examples/jotai-atoms/Demo';
import Valtio from './examples/valtio-proxy/Demo';
import Xstate from './examples/xstate-fsm/Demo';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <BasicInit />,
      },
      {
        path: 'basic-init',
        element: <BasicInit />,
      },
      {
        path: 'templates',
        element: <SchedulerTemplatesDemo />,
      },
      {
        path: 'recurring-events',
        element: <RecurringEventsDemo />,
      },
      {
        path: 'custom-form',
        element: <CustomForm />,
      },
      {
        path: 'units',
        element: <UnitsViewDemo />,
      },
      {
        path: 'timeline',
        element: <TimelineViewDemo />,
      },
      {
        path: 'custom-edit-view',
        element: <CustomEditView />,
        children: [
          { index: true, element: <SchedulerView /> },
          { path: 'editor/:id', element: <EditorView /> },
        ],
      },
      {
        path: 'redux-toolkit',
        element: <ReduxToolkit />,
      },
      {
        path: 'zustand-basic',
        element: <Zustand />,
      },
      {
        path: 'mobx-basic',
        element: <Mobx />,
      },
      {
        path: 'jotai-atoms',
        element: <Jotai />,
      },
      {
        path: 'valtio-proxy',
        element: <Valtio />,
      },
      {
        path: 'xstate-fsm',
        element: <Xstate />,
      },
      {
        path: 'export-data',
        element: <ExportData />,
      },
      {
        path: 'agenda',
        element: <AgendaDemo />,
      },
    ],
  },
]);