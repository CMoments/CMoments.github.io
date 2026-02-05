import { useMemo, useCallback } from 'react';
import { useGanttDatastore, useResourceAssignments, Task, ResourceItem} from '@dhx/trial-react-gantt';

interface UseResourceHistogram {
  getAllocatedValue: (tasks: any[], resource: any) => number;
  getCapacity: (date: Date, resource: any) => number;
  isGroupResource: (resource: any) => boolean;
}

export function useResourceHistogram(ganttRef: React.RefObject<any>): UseResourceHistogram {
  const resourceStore = useGanttDatastore<any>(ganttRef, 'resource');
  const { getResourceAssignments } = useResourceAssignments(ganttRef);

  // provide your own logic for capacity
  const WORK_DAY = 8;
  const capacityCache = useMemo(() => new Map<string, number>(), []);

  const isGroupResource = useCallback((resource: any) => {
    return resourceStore.hasChild(resource.id);
  }, [resourceStore]);

  const getAllocatedValue = useCallback((tasks: Task[], resource: ResourceItem) => {
    return tasks.reduce((sum: number, task: any) => {
      const assignments = getResourceAssignments(resource.id, task.id);
      return sum + assignments.reduce((acc: number, a: any) => acc + Number(a.value), 0);
    }, 0);
  }, [getResourceAssignments]);

  const getCapacity = useCallback((date: Date, resource: any) => {
    if (isGroupResource(resource)) {
      return -1; // e.g. group resources have no capacity
    }
    const key = `${date.valueOf()}_${resource.id}`;
    if (!capacityCache.has(key)) {
      // simplistic random capacity logic
      const randomFactor = [0, 1, 2, 3][Math.floor(Math.random() * 4)];
      capacityCache.set(key, randomFactor * WORK_DAY);
    }
    return capacityCache.get(key)!;
  }, [capacityCache, isGroupResource]);

  return {
    getAllocatedValue,
    getCapacity,
    isGroupResource
  };
}
