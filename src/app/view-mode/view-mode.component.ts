import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../state-controllers/chart-controllers/store/states/app.state';
import { Chart } from '../models/chart.model';
import * as Highcharts from 'highcharts';
import { WeatherService } from '../services/weather.service';
import { setChart } from '../state-controllers/chart-controllers/store/actions/chart.action';
import { setDateRange } from '../state-controllers/chart-controllers/store/actions/date-range.action';

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

    // Load charts from the store
    this.store.select('newChart').subscribe(charts => {
      this.charts = charts;
      // this.filterCharts(); 
    });

    this.store.select(state => state.dateRange).subscribe(dateRange => {
      if (dateRange.startDate && dateRange.endDate) {
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);

        this.dateRangeForm.setValue({
          start: startDate,
          end: endDate
        }, { emitEvent: false });

        // Fetch and display data automatically
        this.fetchAndUpdateData(startDate, endDate);
      }
    });

    this.dateRangeForm.valueChanges.subscribe(values => {
      const { start, end } = values;
      const startDate = start ? new Date(start).toISOString().split('T')[0] : null;
      const endDate = end ? new Date(end).toISOString().split('T')[0] : null;
      this.store.dispatch(setDateRange({ startDate, endDate }));
      this.filterCharts();
      if (startDate && endDate) {
        this.fetchAndUpdateData(new Date(startDate), new Date(endDate));
      }
    });
  }

  // Fetch and update data
  fetchAndUpdateData(startDate: Date, endDate: Date): void {
    this.weatherService.getWeatherData(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]).subscribe(data => {
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
    const { start, end } = this.dateRangeForm.value;
    if (start && end) {
      this.fetchAndUpdateData(start, end);
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
