import { createReducer, on } from '@ngrx/store';
import { addChart, ChartActions, ChartActionTypes, editChart, removeChart } from '../actions/chart.action';
import { Chart } from '../../../../models/chart.model';
import { Action } from '@ngrx/store';

const generateRandomData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      date: new Date(2023, 0, i + 1).toISOString(),
      value: Math.floor(Math.random() * 100)
    });
  }
  return data;
};

export const initialState: Chart[] = [
  { id: 1, name: 'Chart 1', type: 'line', color: '#FF0000', data: generateRandomData() },
  { id: 2, name: 'Chart 2', type: 'spline', color: '#00FF00', data: generateRandomData() },
  { id: 3, name: 'Chart 3', type: 'area', color: '#0000FF', data: generateRandomData() }
];

const _chartReducer = createReducer(
  initialState,
  on(addChart, (state, { chart }) => [...state, chart]),
  on(editChart, (state, { chart }) => state.map(c => c.id === chart.id ? chart : c)),
  on(removeChart, (state, { chartId }) => state.filter(c => c.id !== chartId))
);

// export function chartReducer(state: Chart[], action: Action) {
//   return _chartReducer(state, action);
// }


// export function chartReducer(state: Chart[] = [], action: ChartActions): Chart[] {
//   switch (action.type) {
//     case ChartActionTypes.ADD_CHART:
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// }

export function chartReducer(state: Chart[], action: Action) {
  return _chartReducer(state, action);
}

