import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Chart } from '../models/chart.model';
import { AppState } from '../state-controllers/chart-controllers/store/states/app.state';
import * as Highcharts from 'highcharts';
import { WeatherService } from '../services/weather.service';

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
  // dateInvalid: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private store: Store<AppState>, 
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.dateRangeForm = this.fb.group({
      start: [null],
      end: [null]
    });

    this.store.select('charts').subscribe(charts => {
      console.log("charts", charts);
      this.charts = charts;
      // this.filterCharts(); // Initial filtering
    });

    this.dateRangeForm.valueChanges.subscribe(() => this.filterCharts());
  }

  convertToChartData(data: any[]): { date: string, value: number }[] {
    return data.map(item => ({
      date: item.date,
      value: item.temperature
    }));
  }

  onSubmit() {
    const { start, end } = this.dateRangeForm.value;
    if (start && end) {
      const startDate = new Date(start).toISOString().split('T')[0];
      const endDate = new Date(end).toISOString().split('T')[0];

      // Fetch data from the API using the service
      this.weatherService.getWeatherData(startDate, endDate).subscribe(data => {
        const chartData = this.convertToChartData(data);
        this.updateChartsWithData(chartData);
        console.log("Weather Data:", data);
      });
    }
  }

  
  updateChartsWithData(chartData: { date: string, value: number }[]) {
    this.charts = this.charts.map(chart => ({
      ...chart,
      data: chartData 
    }));
    this.filterCharts();
  }

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
