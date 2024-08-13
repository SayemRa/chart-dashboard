import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { WeatherService } from '../services/weather.service';
import * as Highcharts from 'highcharts';
import { Chart } from '../models/chart.model';
import { AppState } from '../state-controllers/chart-controllers/store/states/app.state';
import { setDateRange } from '../state-controllers/chart-controllers/store/actions/date-range.action';
import { loadWeatherData } from '../state-controllers/chart-controllers/store/actions/weahter.action';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.css']
})
export class ViewModeComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  dateRangeForm!: FormGroup;
  charts: Chart[] = [];
  filteredCharts: any[] = [];
  cities = [
    { name: 'Helsinki', value: { lat: 60.1695, lng: 24.9354 } },
    { name: 'Tampere', value: { lat: 61.4991, lng: 23.7871 } },
    { name: 'Turku', value: { lat: 60.4515, lng: 22.2687 } },
    { name: 'Oulu', value: { lat: 65.0124, lng: 25.4682 } },
    { name: 'Rovaniemi', value: { lat: 66.5, lng: 25.7167 } },
    { name: 'Joensuu', value: { lat: 62.6012, lng: 29.7632} },
  ];

  constructor(
    private fb: FormBuilder, 
    private store: Store<AppState>, 
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.dateRangeForm = this.fb.group({
      start: [null],
      end: [null],
      city: ['']
    });

    // Load charts from the store
    this.store.select('newChart').subscribe(charts => {
      this.charts = charts;
      // this.filterCharts(); 
    });

    this.store.select(state => state.dateRange).subscribe(dateRange => {
      if (dateRange.startDate && dateRange.endDate) {
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);
      }
    });

    this.dateRangeForm.valueChanges.subscribe(values => {
      const { start, end, city } = values;
      const startDate = start ? new Date(start).toISOString().split('T')[0] : null;
      const endDate = end ? new Date(end).toISOString().split('T')[0] : null;
      this.store.dispatch(setDateRange({ startDate, endDate }));
      this.filterCharts();
      if (startDate && endDate && city) {
        this.store.dispatch(loadWeatherData({ start: startDate, end: endDate, latitude: city.lat, longitude: city.lng }));
      }
    });

    // Subscribe to weather data from the store
    this.store.select(state => state.weather.data).subscribe(data => {
      const chartData = this.convertToChartData(data);
      this.updateChartsWithData(chartData);
    });
  }

  convertToChartData(data: any[]): { date: string, value: number }[] {
    return data.map(item => ({
      date: item.date,
      value: item.temperature
    }));
  }

  onSubmit() {
    const { start, end, city } = this.dateRangeForm.value;
    if (start && end && city) {
      this.store.dispatch(loadWeatherData({ start: new Date(start).toISOString().split('T')[0], end: new Date(end).toISOString().split('T')[0], latitude: city.lat, longitude: city.lng }));
    }
  }

  updateChartsWithData(chartData: { date: string, value: number }[]) {
    this.charts = this.charts.map(chart => ({
      ...chart,
      data: chartData 
    }));
    this.filterCharts();
    // this.store.dispatch(setChart({ weatherData: this.charts }));
  }

  //highcharts configuration
  filterCharts(): void {
    const { start, end } = this.dateRangeForm.value;
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    this.filteredCharts = this.charts.map(chart => {
      const filteredData = chart.data.filter(d => {
        const date = new Date(d.date);
        return (!startDate || date >= startDate) && (!endDate || date <= endDate);
      });

      return {
        ...chart,
        options: {
          title: { text: chart.name },
          xAxis: {
            type: 'datetime',
            labels: {
              format: '{value:%B %e, %Y}',
            },
            useUTC: true,
          },
          series: [{
            type: chart.type,
            data: filteredData.map(d => [Date.UTC(new Date(d.date).getUTCFullYear(), new Date(d.date).getUTCMonth(), new Date(d.date).getUTCDate()), d.value]),
            color: chart.color,
          }]
        }
      };
    });
  }
}