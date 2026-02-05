import React from "react";
import { Box, Typography, Avatar, Chip, Stack } from "@mui/material";
import { Event } from "@dhx/trial-react-scheduler";

export interface EventTextBoxProps {
	event: Event;
}

const EventTextBox: React.FC<EventTextBoxProps> = ({ event }) => {
	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				px: 0.5,
				py: 0.3,
				display: "flex",
				alignItems: "center",
				overflow: "hidden",
			}}
		>
			<Avatar
				sx={{
					bgcolor: "#00000099",
					width: 24,
					height: 24,
					fontSize: 12,
					mr: 0.5,
				}}
			>
				{(event.owner?.substring(0, 2).toUpperCase() ?? "PM")}
			</Avatar>

			<Stack spacing={0.25} sx={{ overflow: "hidden" }}>
				<Typography
					variant="caption"
					sx={{
						lineHeight: 1.1,
						fontWeight: 600,
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{event.text}
				</Typography>

				{event.type && (
					<Chip
						label={event.type}
						size="small"
						sx={{
							height: 14,
							fontSize: 9,
							bgcolor: "rgba(255,255,255,0.25)",
							color: "#000",
							"& .MuiChip-label": { px: 0.5, py: 0 },
						}}
					/>
				)}
			</Stack>
		</Box>
	);
};

export default EventTextBox;