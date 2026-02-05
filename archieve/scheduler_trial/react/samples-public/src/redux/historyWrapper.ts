import { createAction, Reducer } from "@reduxjs/toolkit";

export const undo = createAction("history/undo");
export const redo = createAction("history/redo");
export const clear = createAction("history/clear");

/** Wraps any reducer in past/present/future history */
export function withHistory<S>(baseReducer: Reducer<S>): Reducer<any> {
	type History = { past: S[]; present: S; future: S[] };

	const initialPresent = baseReducer(undefined, { type: "@@INIT" }) as S;
	const initialState: History = { past: [], present: initialPresent, future: [] };

	return (state: History = initialState, action: any): History => {
		if (undo.match(action)) {
			if (!state.past.length) return state;
			const previous = state.past[state.past.length - 1];
			const newPast = state.past.slice(0, -1);
			return { past: newPast, present: previous, future: [state.present, ...state.future] };
		}
		if (redo.match(action)) {
			if (!state.future.length) return state;
			const next = state.future[0];
			const newFuture = state.future.slice(1);
			return { past: [...state.past, state.present], present: next, future: newFuture };
		}
		if (clear.match(action)) return initialState;

		const newPresent = baseReducer(state.present, action) as S;
		if (newPresent === state.present) return state;
		return { past: [...state.past, state.present], present: newPresent, future: [] };
	};
}