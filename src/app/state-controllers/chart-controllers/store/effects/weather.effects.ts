import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from 'src/app/services/weather.service';
// import { WeatherActionTypes, LoadWeatherDataSuccess, LoadWeatherDataFail } from '../actions/weather.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { WeatherActionTypes,LoadWeatherDataSuccess, LoadWeatherDataFail } from '../actions/weahter.action';
import { Action } from '@ngrx/store';

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  loadWeatherData$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActionTypes.LOAD_WEATHER_DATA),
    mergeMap((action: any) => this.weatherService.getWeatherData(action?.payload?.lat, action?.payload?.lon, action?.payload?.startDate, action?.payload?.endDate).pipe(
      map(data => {
        console.log('Effect: LoadWeatherDataSuccess:', data);
        return new LoadWeatherDataSuccess(data);
      }),
      catchError(error => of(new LoadWeatherDataFail(error.message)))
    ))
  ));
}

