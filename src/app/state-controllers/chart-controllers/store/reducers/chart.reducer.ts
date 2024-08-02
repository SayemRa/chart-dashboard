import { createReducer, on } from '@ngrx/store';
import { addChart, editChart, removeChart } from '../actions/chart.action';
import { Chart } from '../../../../models/chart.model';
import { Action } from '@ngrx/store';

export const initialState: Chart[] = [];

const _chartReducer = createReducer(
  initialState,
  on(addChart, (state, { chart }) => [...state, chart]),
  on(editChart, (state, { chart }) => state.map(c => c.id === chart.id ? chart : c)),
  on(removeChart, (state, { chartId }) => state.filter(c => c.id !== chartId))
);


export function chartReducer(state: Chart[], action: Action) {
  return _chartReducer(state, action);
}
