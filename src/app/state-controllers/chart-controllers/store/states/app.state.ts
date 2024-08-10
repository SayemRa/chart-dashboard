import { ActionReducerMap, Action } from '@ngrx/store';
import { chartReducer } from '../reducers/chart.reducer';
import { Chart } from '../../../../models/chart.model';
import { ChartActions } from '../actions/chart.action';
import { weatherReducer } from '../reducers/weather.reducer';

export interface AppState {
  weather: Chart[];
  charts: Chart[];
}

export const reducers: ActionReducerMap<AppState, ChartActions> = {
  charts: chartReducer as any,
  weather: weatherReducer as any
};

