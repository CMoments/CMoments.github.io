import { Button } from "@mui/material";
import { Task } from "@dhx/trial-react-gantt";

interface StatusButtonProps {
  task: Task;
  onClick: () => void;
}

export default function StatusButton({ task, onClick }: StatusButtonProps) {
  return (
    <Button
      color={task.completed ? "success" : "info"}
      variant="contained"
      onClick={onClick}
    >
      {task.completed ? "done" : "not done"}
    </Button>
  );
}