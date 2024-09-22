import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  successConfig : MatSnackBarConfig = {
    duration : 3000,
    horizontalPosition : 'center',
    verticalPosition : 'top',
    panelClass : ['notification', 'success']

  };

  errorConfig : MatSnackBarConfig = {
    duration : 3000,
    horizontalPosition : 'center',
    verticalPosition : 'top',
    panelClass : ['notification', 'error']

  };

  constructor(private _snackBar : MatSnackBar) { }

  successMessage(message : string) {
    this._snackBar.open(message, '', this.successConfig);

  }

  errorMessage(message : string) {
    this._snackBar.open(message, '', this.errorConfig);

  }

  
}
