import { ActionReducerMap, Action } from '@ngrx/store';
import { chartReducer } from '../reducers/chart.reducer';
import { Chart } from '../../../../models/chart.model';
import { ChartActions } from '../actions/chart.action';

export interface AppState {
  charts: Chart[];
}

export const reducers: ActionReducerMap<AppState, ChartActions> = {
  charts: chartReducer as any
};

