import { createAction, ActionCreatorWithPayload} from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

//Simulate receiving ID from backend
const generateId = () => `id_${Date.now().toString()}`;

export const createEvent = createAction('schedulerDomain/createEvent', (eventData) => {
  const newEvent = { ...eventData, id: generateId() };
  return { payload: newEvent };
});

export const deleteEvent = createAction('schedulerDomain/deleteEvent', (id) => {
  return { payload: id };
});

export const updateEvent = createAction('schedulerDomain/updateEvent', (eventData) => {
  return { payload: eventData };
});

// Helper function to dispatch an action and return its payload consistently
export function dispatchAction<T>(
  dispatch: Dispatch,
  action: ActionCreatorWithPayload<T, string>,
  data: T
) {
  return dispatch(action(data)).payload;
}

