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
  dateRangeForm!: FormGroup;
  charts: Chart[] = [];
  filteredCharts: any[] = [];
  dateInvalid = false;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.dateRangeForm = this.fb.group({
      start: [null],
      end: [null]
    });

    this.store.select('charts').subscribe(charts => {
      console.log("charts",charts)
      this.charts = charts;
      this.filterCharts();
    });

    this.dateRangeForm.valueChanges.subscribe(() => this.filterCharts());
  }

  filterCharts(): void {
    const { start, end } = this.dateRangeForm.value;
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    if (startDate && endDate && startDate > endDate) {
      this.dateInvalid = true;
      this.filteredCharts = [];
      return;
    } else {
      this.dateInvalid = false;
    }

    this.filteredCharts = this.charts.map(chart => {
      const filteredData = chart.data.filter(d => {
        const date = new Date(d.date);
        return (!startDate || date >= startDate) && (!endDate || date <= endDate);
      });

      return {
        ...chart,
        options: {
          title: { text: chart.name },
          series: [{
            type: chart.type,
            data: filteredData.map(d => [new Date(d.date).getTime(), d.value]),
            color: chart.color
          }]
        }
      };
    });
  }
}
