import { WeatherActions, WeatherActionTypes } from "../actions/weahter.action";


export interface WeatherState {
  data: any;
  loading: boolean;
  error: string;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: ''
};

export function weatherReducer(state = initialState, action: WeatherActions): WeatherState {
  switch (action.type) {
    case WeatherActionTypes.LOAD_WEATHER_DATA:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case WeatherActionTypes.LOAD_WEATHER_DATA_SUCCESS:
      console.log('Reducer: LOAD_WEATHER_DATA_SUCCESS:', action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case WeatherActionTypes.LOAD_WEATHER_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
