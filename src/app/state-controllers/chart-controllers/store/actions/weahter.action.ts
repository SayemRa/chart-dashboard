// weather.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadWeatherData = createAction(
  '[Weather] Load Weather Data',
  props<{ start: string; end: string }>()
);

export const loadWeatherDataSuccess = createAction(
  '[Weather] Load Weather Data Success',
  props<{ data: any[] }>()
);

export const loadWeatherDataFailure = createAction(
  '[Weather] Load Weather Data Failure',
  props<{ error: any }>()
);
