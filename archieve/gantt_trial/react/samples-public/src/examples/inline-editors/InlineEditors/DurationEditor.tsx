import React, {
	useState,
	forwardRef,
	useImperativeHandle,
	Ref
} from 'react';
import { InlineEditorMethods } from '@dhx/trial-react-gantt';
import TextField from "@mui/material/TextField";

interface DurationEditorProps {
	initialValue: any;
}

const DurationEditor = forwardRef<InlineEditorMethods, DurationEditorProps>(
	({ initialValue }, ref) => {
		const [value, setValue] = useState(initialValue || "");

		useImperativeHandle(ref, (): InlineEditorMethods => ({
			getValue: () => +value,
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
			<TextField
				className="number_editor" 
				variant="standard" 
				defaultValue={value} 
				type="number" 
				slotProps={{ htmlInput: { min: 1, max: 99999, background: "white" } }}
				autoFocus 
				onChange={e => setValue(e.target.value)}
			/>
		);
	}
);

export default DurationEditor;