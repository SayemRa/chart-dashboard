import { ActionReducerMap, Action } from '@ngrx/store';
import { chartReducer } from '../reducers/chart.reducer';
import { Chart } from '../../../../models/chart.model';
import { ChartActions } from '../actions/chart.action';
import { weatherReducer, WeatherState } from '../reducers/weather.reducer';
import { dateRangeReducer, DateRangeState } from '../reducers/date-range.reducer';

export interface AppState {
  weather: WeatherState;
  charts: Chart[];
  newChart: any;
  dateRange: DateRangeState;
}

export const reducers: ActionReducerMap<AppState, ChartActions> = {
  charts: chartReducer as any,
  weather: weatherReducer as any,
  newChart: chartReducer as any,
  dateRange: dateRangeReducer as any,
};

