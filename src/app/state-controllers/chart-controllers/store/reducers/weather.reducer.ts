// weather.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadWeatherData, loadWeatherDataFailure, loadWeatherDataSuccess } from '../actions/weahter.action';


export interface WeatherState {
  data: any[];
  error: any;
  loading: boolean;
}

export const initialState: WeatherState = {
  data: [],
  error: null,
  loading: false,
};

export const weatherReducer = createReducer(
  initialState,
  on(loadWeatherData, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadWeatherDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    data,
  })),
  on(loadWeatherDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
