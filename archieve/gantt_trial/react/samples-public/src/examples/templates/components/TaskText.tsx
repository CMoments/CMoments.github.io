import { Box, Tooltip, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import PendingIcon from "@mui/icons-material/Pending";
import { Task } from "@dhx/trial-react-gantt";

interface TaskTextProps {
	task: Task;
	onClick: () => void;
}

export default function TaskTextComponent({ task, onClick }: TaskTextProps) {
	return (
		<Box sx={{
			display: "flex",
			border: "1px solid",
			padding: "2px",
			alignItems: "center",
			borderColor: "divider",
			gap: "5px",
			borderRadius: 2,
		}}>
			<Tooltip title={task.completed ? "Status: Completed" : "Status: Pending"}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						borderRadius: "50%",
						padding: "2px",
						"&:hover": {
							backgroundColor: "action.hover",
							cursor: "pointer",
						},
					}}
					onClick={onClick}
				>
					{task.completed ? <DoneIcon fontSize="small" /> : <PendingIcon fontSize="small" />}
				</Box>
			</Tooltip>
			<Typography variant="button" component="div" sx={{ padding: "5px" }}>
				{task.text}
			</Typography>
		</Box>
	);
};