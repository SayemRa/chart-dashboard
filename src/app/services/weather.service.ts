import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  //'https://archive-api.open-meteo.com/v1/archive?latitude=61.4991&longitude=23.7871&start_date=2024-07-22&end_date=2024-08-05&daily=temperature_2m_max'
  private readonly apiUrl = 'https://archive-api.open-meteo.com/v1/archive';

  constructor(private http: HttpClient) {}

  getWeatherData(lat: number, lon: number, startDate: string, endDate: string): Observable<any> {
    console.log('API Response: achire vai' ,);
    let params = new HttpParams()
      .set('latitude', lat.toString())
      .set('longitude', lon.toString())
      .set('start_date', startDate)
      .set('end_date', endDate)
      .set('daily', 'temperature_2m_max');

    return this.http.get(this.apiUrl, { params }).pipe(
      map(response => {
        console.log('API Response:', response);
        return response;
      })
    );
  }
}





