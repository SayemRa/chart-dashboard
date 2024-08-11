import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://archive-api.open-meteo.com/v1/archive';

  constructor(private http: HttpClient) {}

  getWeatherData(startDate: string, endDate: string): Observable<any> {
    const params = {
      latitude: '61.4991',
      longitude: '23.7871',
      start_date: startDate,
      end_date: endDate,
      daily: 'temperature_2m_max',
      timezone: 'GMT'
    };

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        // Transforming the API response into a format suitable for Highcharts
        const data = response.daily.time.map((date: string, index: number) => ({
          date,
          temperature: response.daily.temperature_2m_max[index]
        }));
        return data;
      })
    );
  }
}
