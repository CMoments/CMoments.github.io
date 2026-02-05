import { createHashRouter  } from 'react-router-dom';
import Layout from './layout/Layout';
import BasicInit from './examples/basic-init/Demo';
import CustomForm from './examples/custom-form/Demo';
import CustomEditView from './examples/custom-edit-view/GanttEditorViewDemo';
import GanttView from './examples/custom-edit-view/Gantt';
import EditorView from './examples/custom-edit-view/TaskEditor';
import AutoScheduling from './examples/auto-scheduling/Demo';
import ExportData from './examples/export-data/Demo';
import InlineEditors from './examples/inline-editors/Demo';
import Templates from './examples/templates/Demo';
import ReduxToolkit from './examples/redux-toolkit/Demo';
import ResourceHistogramGantt from './examples/resource-panel/Demo';

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
        element: <Templates />,
      },
      {
        path: 'custom-form',
        element: <CustomForm />,
      },
      {
        path: 'custom-edit-view',
        element: <CustomEditView />,
        children: [
          { index: true, element: <GanttView /> },
          { path: 'editor/:id', element: <EditorView /> },
        ],
      },
      {
        path: 'inline-editors',
        element: <InlineEditors />,
      },
      {
        path: 'auto-scheduling',
        element: <AutoScheduling />,
      },
      {
        path: 'export-data',
        element: <ExportData />,
      },
      {
        path: 'redux-toolkit',
        element: <ReduxToolkit />,
      },
      {
        path: 'resource-panel',
        element: <ResourceHistogramGantt />,
      },
    ],
  },
]);