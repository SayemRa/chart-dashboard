import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.css']
})
export class ChartDialogComponent {
  chartForm: FormGroup;
  chartTypes = ['line', 'spline', 'area'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.chartForm = this.fb.group({
      name: [data.chart ? data.chart.name : '', Validators.required],
      type: [data.chart ? data.chart.type : 'line', Validators.required],
      color: [data.chart ? data.chart.color : '#000000', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.chartForm.valid) {
      this.dialogRef.close(this.chartForm.value);
    }
  }
}
