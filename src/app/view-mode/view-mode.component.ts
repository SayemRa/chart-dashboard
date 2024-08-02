import * as Highcharts from 'highcharts';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
// import { Chart } from '../state/chart.model';
// import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { Chart } from '../models/chart.model';
import { AppState } from '../state-controllers/chart-controllers/store/states/app.state';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.css']
})
export class ViewModeComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  charts: Chart[] = [];
  filteredCharts: any[] = [];
  public dateRangeForm: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });


  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.dateRangeForm = new FormGroup({
      start:  new FormControl(),
      end:  new FormControl(),
    });

    this.loadCharts();

    this.store.select('charts').subscribe(charts => {
      this.charts = charts;
      this.filterCharts();
    });

    this.dateRangeForm.valueChanges.subscribe(() => this.filterCharts());
  }

  loadCharts(): void {
    // Generate or fetch chart data and update this.charts
  }
  
  filterCharts(): void {
    const { start, end } = this.dateRangeForm.value;
    this.filteredCharts = this.charts.map(chart => {
      const filteredData = chart.data.filter((d: any) => {
        const date = new Date(d.date);
        return (!start || date >= start) && (!end || date <= end);
      });

      return {
        ...chart,
        options: {
          title: { text: chart.name },
          series: [{
            type: chart.type,
            data: filteredData.map((d: any) => [new Date(d.date).getTime(), d.value]),
            color: chart.color
          }]
        }
      };
    });
  };


}
