import { Action, createAction, props } from '@ngrx/store';
import { Chart } from '../../../../models/chart.model';

export const addChart = createAction('[Chart] Add Chart', props<{ chart: any }>());
export const editChart = createAction('[Chart] Edit Chart', props<{ chart: Chart }>());
export const removeChart = createAction('[Chart] Remove Chart', props<{ chartId: number }>());
export const setChart = createAction('[Chart] Set Chart', props<{ weatherData: any }>());

export enum ChartActionTypes {
    ADD_CHART = '[Chart] Add Chart'
  }
  
  export class AddChart implements Action {
    readonly type = ChartActionTypes.ADD_CHART;
  
    constructor(public payload: Chart) {}
  }
  
  export type ChartActions = AddChart;