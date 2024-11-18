import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {

  title ?: string;
  message ?: string;

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
    console.log(data);
    this.title = data.split(';')[0];
    this.message = data.split(';')[1];

  }

  // Close dialog on cancel
  onClose() {
    this.dialogRef.close({ status: 'canceled' });
  }


}
