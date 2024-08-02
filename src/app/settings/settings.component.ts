import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
// import { AppState } from '../state/app.state';
import { addChart, editChart, removeChart } from '../state-controllers/chart-controllers/store/actions/chart.action';
import { ChartDialogComponent } from '../chart-dialog/chart-dialog.component';
import { AppState } from '../state-controllers/chart-controllers/store/states/app.state';
import { Chart } from '../models/chart.model';




@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  charts: Chart[] = [];

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('charts').subscribe(charts => {
      this.charts = charts;
    });

    const generateRandomData = () => {
      const data = [];
      for (let i = 0; i < 30; i++) {
        data.push({
          date: new Date(2023, 0, i + 1).toISOString(),
          value: Math.floor(Math.random() * 100)
        });
      }
      console.log("generateRandomData",data);
      return data;
    };
    
  }

  openDialog(chart?: any): void {
    const dialogRef = this.dialog.open(ChartDialogComponent, {
      width: '250px',
      data: { chart: chart, isEdit: !!chart }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (chart) {
          this.store.dispatch(editChart({ chart: { ...chart, ...result } }));
        } else {
          this.store.dispatch(addChart({ chart: { id: new Date().getTime(), ...result } }));
        }
      }
    });
  };

  editChart(chart: Chart): void {
    // Open modal for editing chart
  }

  removeChart(chart: Chart): void {
    this.store.dispatch(removeChart({ chartId: chart.id }));
  }
}
