import { Event } from "@dhx/trial-react-scheduler";

export const initialData: { events: Event[] } = {
	events: [
		{ id: 1, start_date: new Date("2025-07-28T08:00"), end_date: new Date("2025-07-28T09:00"), text: "Team Huddle", classname: "green" },
		{ id: 2, start_date: new Date("2025-07-29T09:30"), end_date: new Date("2025-07-29T10:30"), text: "Bug Triage", classname: "blue" },
		{ id: 3, start_date: new Date("2025-07-28T11:30"), end_date: new Date("2025-07-28T12:30"), text: "Sprint Planning", classname: "green" },
		{ id: 4, start_date: new Date("2025-07-28T14:30"), end_date: new Date("2025-07-28T16:00"), text: "Retrospective", classname: "purple" },
		{ id: 5, start_date: new Date("2025-07-30T08:00"), end_date: new Date("2025-07-30T10:00"), text: "Budget Meeting", classname: "blue" },
		{ id: 6, start_date: new Date("2025-07-30T10:30"), end_date: new Date("2025-07-30T12:00"), text: "Tech Deep-dive", classname: "green" },
		{ id: 7, start_date: new Date("2025-07-31T11:00"), end_date: new Date("2025-07-31T13:00"), text: "Design Review", classname: "blue" },
		{ id: 8, start_date: new Date("2025-07-31T14:00"), end_date: new Date("2025-07-31T17:00"), text: "Stakeholder Demo", classname: "green" },
		{ id: 9, start_date: new Date("2025-08-01T08:00"), end_date: new Date("2025-08-01T10:00"), text: "On-call Review", classname: "purple" },
		{ id: 10, start_date: new Date("2025-08-01T09:30"), end_date: new Date("2025-08-01T10:30"), text: "Client Call", classname: "purple" },
		{ id: 11, start_date: new Date("2025-08-01T14:00"), end_date: new Date("2025-08-01T15:30"), text: "Roadmap Update", classname: "purple" },
		{ id: 12, start_date: new Date("2025-08-01T15:30"), end_date: new Date("2025-08-01T17:00"), text: "Project Alpha Sync", classname: "blue" }
	]
};