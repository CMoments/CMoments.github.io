import { ButtonGroup, Button, Typography, Stack } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import React from 'react';

export interface ToolbarProps {
  currentView: string;
  currentDate: Date;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: 'prev' | 'next' | 'today') => void;
  setView: (view: "day" | "week" | "month", date: Date) => void;
}

export default React.memo(function Toolbar({ currentView, currentDate, onUndo, onRedo, onNavigate, setView }: ToolbarProps) {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ m: 2 }}>
      <Stack direction="row" gap={1}>
        {(["day", "week", "month"] as const).map(l => (
          <Button key={l} variant={currentView === l ? "contained" : "outlined"} onClick={() => setView?.(l, currentDate)}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </Button>
        ))}
        <ButtonGroup>
          <Button onClick={() => onUndo?.()}>
            <UndoIcon />
          </Button>
          <Button onClick={() => onRedo?.()}>
            <RedoIcon />
          </Button>
        </ButtonGroup>
      </Stack>
      <Typography variant="subtitle1" sx={{ ml: 1 }}>
        {new Date(currentDate)?.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
      </Typography>
      <ButtonGroup>
        <Button onClick={() => onNavigate?.("prev")}>
          &nbsp;&lt;&nbsp;
        </Button>
        <Button onClick={() => onNavigate?.("today")}>
          Today
        </Button>
        <Button onClick={() => onNavigate?.("next")}>
          &nbsp;&gt;&nbsp;
        </Button>
      </ButtonGroup>
    </Stack>
  );
});
