import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss'
})
export class SuccessDialogComponent {

  title ?: string;
  message ?: string;
  action ?: string;

  constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {    
    this.title = data.title;
    this.message = data.message;
    this.action = data.action;
  }

  // Close dialog on cancel
  onClose() {
    this.dialogRef.close();
  }
}
