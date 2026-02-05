import React, {
	useState,
	forwardRef,
	useImperativeHandle,
	Ref
} from 'react';
import { InlineEditorMethods, InlineEditorProps } from '@dhx/trial-react-gantt';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";


const DateEditor = forwardRef<InlineEditorMethods, InlineEditorProps>(
	({ initialValue, task, save, cancel, ganttInstance }, ref) => {
		const [value, setValue] = useState(initialValue || "");

		useImperativeHandle(ref, (): InlineEditorMethods => ({
			getValue: () => value,
			setValue: (val: any) => setValue(val),
			isValid: () => true, 
			focus: () => {

			},
			isChanged: (originalValue: any) => {
				return originalValue !== value;
			},

			save: () => {  }
		}));


		return (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker
				className="date_picker"
				value={dayjs(value)}
				open={true}
				format="DD-MM-YYYY"
				onChange={(newValue: any) => {
					setValue(dayjs(newValue).toDate());
					save();
				}}
				slotProps={{
					textField: {
						size: 'small',
					},
				}}
			 autoFocus
			/>
		</LocalizationProvider>
		);
	}
);

export default DateEditor;