import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  public successMessage(message: string, duration: number = 3000) : void {
    const config: MatSnackBarConfig = {
      ...this.defaultConfig,
      duration,
      panelClass: ['notification', 'success']
    };
    this.snackBar.open(message, '', config);
  }

  public errorMessage(message: string, duration: number = 3000) : void {
    const config: MatSnackBarConfig = {
      ...this.defaultConfig,
      duration,
      panelClass: ['notification', 'error']
    };
    this.snackBar.open(message, '', config);
  }

  
  public actionMessage(message: string, action: string, duration: number = 3000) : void {
    const config: MatSnackBarConfig = {
      ...this.defaultConfig,
      duration,
      panelClass: ['notification', 'info']
    };
    this.snackBar.open(message, action, config);  }


}
