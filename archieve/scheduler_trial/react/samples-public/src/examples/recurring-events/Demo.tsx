import React, { useEffect, useRef, useState } from 'react';
import ReactScheduler, { Event, SchedulerConfig, SchedulerTemplates, SchedulerPlugins } from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";


export default function SchedulerTemplatesDemo() {
	useEffect(() => {
		document.title = "DHTMLX React Scheduler | Recurring Events";
	}, []);


  const initialData: { events: Event[] } = {
		events: [
			{
				id: 1,
				text: 'Weekly Team Meeting',
				start_date: new Date('2025-06-03T09:00:00'),
				duration: 3600,
				end_date: new Date('2025-12-02T10:00:00'),
				rrule: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=MO',
				recurring_event_id: null,
				original_start: null
			},
			{
				id: 2,
				text: 'Special Team Meeting',
				start_date: new Date('2025-08-06T12:00:00'),
				end_date: new Date('2025-08-06T13:00:00'),
				rrule: null,
				recurring_event_id: 1,
				original_start: new Date('2025-08-04T09:00:00')
			},
			{
				id: 3,
				text: 'Deleted Team Meeting',
				start_date: new Date('2025-06-17T09:00:00'),
				end_date: new Date('2025-06-17T10:00:00'),
				rrule: null,
				recurring_event_id: 1,
				original_start: new Date('2025-06-17T09:00:00'),
				deleted: true
			},
			{
				id: 4,
				text: 'Daily Team Meeting',
				start_date: new Date('2025-06-03T09:00:00'),
				duration: 900,
				end_date: new Date('2025-12-02T10:00:00'),
				rrule: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=TU,WE,TH,FR',
				recurring_event_id: null,
				original_start: null
			},
		]
	};

	const plugins: SchedulerPlugins = {
		recurring: true
	};

	const config: SchedulerConfig = {
		first_hour: 8,
		last_hour: 20,
		time_step: 15
	};


	return (
		<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<ReactScheduler
				events={initialData.events}
				date={new Date("2025-08-15T00:00:00Z")}
				view={"month"}
				config={config}
				plugins={plugins}
			/>
		</div>
	);
};