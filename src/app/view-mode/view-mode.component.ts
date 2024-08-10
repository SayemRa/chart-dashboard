import * as Highcharts from 'highcharts';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
// import { Chart } from '../state/chart.model';
// import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { Chart } from '../models/chart.model';
import { AppState } from '../state-controllers/chart-controllers/store/states/app.state';
import * as moment from 'moment';

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
  chartData: any;


  response = {
    "latitude": 61.476273,
    "longitude": 23.707317,
    "generationtime_ms": 0.0699758529663086,
    "utc_offset_seconds": 0,
    "timezone": "GMT",
    "timezone_abbreviation": "GMT",
    "elevation": 107.0,
    "daily_units": {
      "time": "iso8601",
      "temperature_2m_max": "°C"
    },
    "daily": {
      "time": [
        "2024-07-22",
        "2024-07-23",
        "2024-07-24",
        "2024-07-25",
        "2024-07-26",
        "2024-07-27",
        "2024-07-28",
        "2024-07-29",
        "2024-07-30",
        "2024-07-31",
        "2024-08-01",
        "2024-08-02",
        "2024-08-03",
        "2024-08-04",
        "2024-08-05"
      ],
      "temperature_2m_max": [
        26.0,
        24.3,
        22.5,
        23.7,
        24.3,
        23.2,
        22.5,
        22.4,
        22.3,
        18.7,
        18.1,
        19.8,
        19.8,
        19.7,
        21.5
      ]
    }
  };

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

 
  this.chartData = this.convertToChart(this.response);

  console.log("formattedData",this.chartData);

}



// Function to convert the response to Chart format
convertToChart(response: any): Chart {
  // Extract the time and temperature arrays from the response
  const { time, temperature_2m_max } = response.daily;

  // Map the extracted data to the required format
  const data = time.map((date: string, index: number) => ({
    date,
    value: temperature_2m_max[index]
  }));

  // Create and return the Chart object
  const chart: Chart = {
    id: 1,
    name: 'Temperature Data',
    type: 'line', // Assuming line chart for temperature data
    color: '#FF0000', // Assuming blue color for the chart
    data
  };

  return chart;
}

  onSubmit(){
    console.log("dateRangeForm",this.dateRangeForm.value)
  }

  filterCharts(): void {
    const { start, end } = this.dateRangeForm.value;
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;
    this.filteredCharts = this.charts.map(chart => {
      const filteredData = chart.data.filter(d => {
        const date = new Date(d.date);
        // console.log(`Original date: ${d.date}, Parsed date: ${date}`); 
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
            data: filteredData.map(d => [Date.UTC(new Date(d.date).getUTCFullYear(), new Date(d.date).getUTCMonth(), new Date(d.date).getUTCDate()), d.value]), // Use UTC dates
            color: chart.color,
          }]
        }
      };
    });
  }


  
  

  // filterCharts(): void {
  //   const { start, end } = this.dateRangeForm.value;
  //   const startDate = start ? new Date(start) : null;
  //   const endDate = end ? new Date(end) : null;

  //   if (startDate && endDate && startDate > endDate) {
  //     this.dateInvalid = true;
  //     this.filteredCharts = [];
  //     return;
  //   } else {
  //     this.dateInvalid = false;
  //   }

  //   this.filteredCharts = this.charts.map(chart => {
  //     const filteredData = chart.data.filter(d => {
  //       const date = new Date(d.date);
  //       return (!startDate || date >= startDate) && (!endDate || date <= endDate);
  //     });

  //     return {
  //       ...chart,
  //       options: {
  //         title: { text: chart.name },
  //         series: [{
  //           type: chart.type,
  //           data: filteredData.map(d => [new Date(d.date).getTime(), d.value]),
  //           color: chart.color
  //         }]
  //       }
  //     };
  //   });
  // }
}
