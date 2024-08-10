import { Action } from '@ngrx/store';

export enum WeatherActionTypes {
  LOAD_WEATHER_DATA = '[Weather] Load Weather Data',
  LOAD_WEATHER_DATA_SUCCESS = '[Weather] Load Weather Data Success',
  LOAD_WEATHER_DATA_FAIL = '[Weather] Load Weather Data Fail'
}

export class LoadWeatherData implements Action {
  readonly type = WeatherActionTypes.LOAD_WEATHER_DATA;
  constructor(public payload: { lat: number, lon: number, startDate: string, endDate: string }) {}
}

export class LoadWeatherDataSuccess implements Action {
  readonly type = WeatherActionTypes.LOAD_WEATHER_DATA_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadWeatherDataFail implements Action {
  readonly type = WeatherActionTypes.LOAD_WEATHER_DATA_FAIL;
  constructor(public payload: string) {}
}

export type WeatherActions = LoadWeatherData | LoadWeatherDataSuccess | LoadWeatherDataFail;
