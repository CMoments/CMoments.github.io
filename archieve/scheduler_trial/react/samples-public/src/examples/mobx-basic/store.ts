import { makeAutoObservable } from "mobx";
import type { SchedulerConfig } from "@dhx/trial-react-scheduler";
import { seedEvents, seedView, seedDate, type SchedulerView } from "../../common/Seed";

interface SchedulerState {
  events: any[];
  currentDate: number;
  view: SchedulerView;
}

class SchedulerStore {
  events: any[] = seedEvents;
  view: SchedulerView = seedView;
  currentDate: number = seedDate;
  config: SchedulerConfig = {};

  past: SchedulerState[] = [];
  future: SchedulerState[] = [];
  maxHistory = 50;

  constructor() {
    makeAutoObservable(this);
  }
  //Simulate receiving ID from backend
  _generateId = () => {
    return `id_${Date.now().toString()}`;
  }
  _snapshot = (): SchedulerState => {
    return {
      events: this.events.slice(),
      currentDate: this.currentDate,
      view: this.view,
    };
  }

  _saveToHistory = () => {
    this.past.push(this._snapshot());
    if (this.past.length > this.maxHistory) {
      this.past.shift();
    }
    this.future = [];
  }

  _restore = (state: SchedulerState) => {
    this.events = state.events;
    this.currentDate = state.currentDate;
    this.view = state.view;
  }

  setCurrentDate = (date: number) => {
    this._saveToHistory();
    this.currentDate = date;
  }

  setView = (view: SchedulerView) => {
    this._saveToHistory();
    this.view = view;
  }

  createEvent = (event: any) => {
    this._saveToHistory();
    const uid = this._generateId();
    const newEvent = {...event, id: uid};
    this.events = [...this.events, newEvent];
    return newEvent;
  }

  updateEvent = (updatedEvent: any) => {
    this._saveToHistory();
    this.events = this.events.map(ev => (ev.id === updatedEvent.id ? { ...ev, ...updatedEvent } : ev));
  }

  deleteEvent = (id: any) => {
    this._saveToHistory();
    this.events = this.events.filter(ev => String(ev.id) !== String(id));
  }

  undo = () => {
    if (this.past.length === 0) return;
    const current = this._snapshot();
    const previous = this.past.pop();
    if (previous) {
      this.future.unshift(current);
      this._restore(previous);
    }
  }

  redo = () => {
    if (this.future.length === 0) return;
    const next = this.future.shift();
    if (next) {
      this.past.push(this._snapshot());
      this._restore(next);
    }
  }
}

const schedulerStore = new SchedulerStore();
export default schedulerStore;
