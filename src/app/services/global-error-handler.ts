import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
  constructor(private router: Router) {}

  handleError(error: any): void {
    // Log the error to the console (you might want to log it to an external service)
    console.error('An error occurred:', error);
    
    // Navigate to the error page
    this.router.navigate(['/error']);
  }
}