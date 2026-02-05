import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { Event } from '@dhx/trial-react-scheduler';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { SchedulerEditorContext } from './SchedulerEditorViewDemo';


export default function EventEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, handleSaveEvent, handleDeleteEvent } =
    useOutletContext<SchedulerEditorContext>();


  const numericId = Number(id);
  const existingEvent = events.find(e => e.id === numericId);

  const now = new Date();
  const defaultDurationMin = 60;

  const initialStartDate = existingEvent?.start_date
    ? new Date(existingEvent.start_date)
    : now;
  const initialEndDate = existingEvent?.end_date
    ? new Date(existingEvent.end_date)
    : new Date(initialStartDate.getTime() + defaultDurationMin * 60 * 1000);

  const initialDuration = Math.max(
    1,
    Math.round((initialEndDate.getTime() - initialStartDate.getTime()) / 60000),
  );

  const [formData, setFormData] = useState<Event>({
    id: numericId,
    text: existingEvent?.text ?? "New Event",
    start_date: initialStartDate,
    end_date: initialEndDate,
  });

  const [startDateValue, setStartDateValue] = useState<Dayjs>(
    dayjs(formData.start_date),
  );
  const [durationMinutes, setDurationMinutes] = useState<number>(initialDuration);

  function updateFormData(
    field: any,
    value: any,
  ) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  function applyDurationChange(newDuration: number) {
    setDurationMinutes(newDuration);
    const newEnd = dayjs(startDateValue).add(newDuration, 'minute').toDate();
    setFormData(prev => ({ ...prev, end_date: newEnd }));
  }

  function applyStartDateChange(newStart: Dayjs) {
    setStartDateValue(newStart);
    const adjustedEnd = dayjs(newStart).add(durationMinutes, 'minute').toDate();
    setFormData(prev => ({ ...prev, start_date: newStart.toDate(), end_date: adjustedEnd }));
  }

  function handleSave() {
    handleSaveEvent(formData);
    navigate('..');
  }

  function handleDelete() {
    handleDeleteEvent(String(formData.id));
    navigate('..');
  }

  useEffect(() => {
    document.title = 'DHTMLX React Scheduler | Custom Edit View | Event Editor';
  }, []);

  return (
    <Box sx={{ width: 380, p: 2, border: '1px solid #ccc' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Editing Event "{formData.text}"
      </Typography>

      <TextField
        label="Event Name"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.text}
        onChange={e => updateFormData('text', e.target.value)}
      />

      <DateTimePicker
        label="Start Date & Time"
        value={startDateValue}
        onChange={newVal => {
          if (newVal) applyStartDateChange(newVal);
        }}
        slotProps={{ textField: { fullWidth: true } }}
      />

      <TextField
        label="Duration (minutes)"
        type="number"
        fullWidth
        sx={{ mt: 2, mb: 2 }}
        value={durationMinutes}
        inputProps={{ min: 1 }}
        onChange={e => {
          const parsed = parseInt(e.target.value, 10);
          applyDurationChange(Number.isNaN(parsed) ? 1 : parsed);
        }}
      />

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => navigate('..')}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
    </Box>
  );
}
