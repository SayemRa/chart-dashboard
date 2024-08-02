import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { chartReducer } from '../reducers/chart.reducer';
import { Chart } from '../../../../models/chart.model';

export interface AppState {
  charts: Chart[];
}

export const reducers: ActionReducerMap<AppState> = {
  charts: chartReducer as ActionReducer<Chart[], Action<string>>
};
