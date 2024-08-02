import { createAction, props } from '@ngrx/store';
import { Chart } from '../../../../models/chart.model';

export const addChart = createAction('[Chart] Add Chart', props<{ chart: Chart }>());
export const editChart = createAction('[Chart] Edit Chart', props<{ chart: Chart }>());
export const removeChart = createAction('[Chart] Remove Chart', props<{ chartId: number }>());
