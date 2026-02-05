import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { Task } from "@dhx/trial-react-gantt";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { GanttEditorContext } from './GanttEditorViewDemo';

export default function TaskEditor() {
  useEffect(() => {
    document.title = "DHTMLX React Gantt | Custom Edit View | Task Editor";
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  const { tasks, handleSaveTask, handleDeleteTask } = useOutletContext<GanttEditorContext>();

  const numId = Number(id);
  const existing = tasks.find(t => t.id === numId) || {
    id: numId,
    text: "",
    progress: 0,
    duration: 1,
    start_date: new Date(),
  };

  const [formData, setFormData] = useState<Task>({
    ...existing
  });
  const [startDateValue, setStartDateValue] = useState<Dayjs>(
    dayjs(formData.start_date)
  );


  function handleChange(field: keyof Task, value: any) {
    setFormData((prev:Task) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    handleSaveTask(formData);
    navigate("..");
  }

  function handleDelete() {
    handleDeleteTask(String(formData.id));
    navigate("..");
  }

  function handleCancel() {
    navigate("..");
  }

  return (
    <Box sx={{ width: 380, p: 2, border: "1px solid #ccc" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Editing Task {formData.id}
      </Typography>

      <TextField
        label="Task Name"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.text}
        onChange={e => handleChange("text", e.target.value)}
      />

      
      <DatePicker
        label="Start Date"
        value={startDateValue}
        disabled={(formData.type === "project")}
        onChange={newVal => {
          if (newVal) {
            setStartDateValue(newVal);
            handleChange("start_date", newVal.toDate());
          }
        }}
      />

      <TextField
        label="Duration"
        type="number"
        disabled={(formData.type === "project")}
        fullWidth
        sx={{ mt: 2, mb: 2 }}
        value={formData.duration ?? 1}
        onChange={e => handleChange("duration", parseInt(e.target.value, 10) || 1)}
      />

      <Typography gutterBottom>Progress (%)</Typography>
      <Slider
        min={0}
        max={100}
        value={Math.round((formData.progress || 0) * 100)}
        onChange={(_, val) => {
          const fraction = (Array.isArray(val) ? val[0] : val) / 100;
          handleChange("progress", fraction);
        }}
        valueLabelDisplay="auto"
        sx={{ mb: 3 }}
      />

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
    </Box>
  );
}
