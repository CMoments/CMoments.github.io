import React, {
	useState,
	forwardRef,
	useImperativeHandle
} from 'react';
import { InlineEditorMethods, InlineEditorProps } from '@dhx/trial-react-gantt';


const TextEditor = forwardRef<InlineEditorMethods, InlineEditorProps>(
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
			<input
				type="text"
				value={value}
				onChange={e => setValue(e.target.value)}
				autoFocus
			/>
		);
	}
);

export default TextEditor;