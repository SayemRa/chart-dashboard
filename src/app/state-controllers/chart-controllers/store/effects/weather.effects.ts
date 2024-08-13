// weather.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';


import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { loadWeatherData, loadWeatherDataFailure, loadWeatherDataSuccess } from '../actions/weahter.action';

@Injectable()
export class WeatherEffects {
  loadWeatherData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWeatherData),
      mergeMap((action) =>
        this.weatherService.getWeatherData(action.start, action.end, action.latitude, action.longitude).pipe(
          map((data) => loadWeatherDataSuccess({ data })),
          catchError((error) => of(loadWeatherDataFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private weatherService: WeatherService) {}
}
