import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { MenuList } from '../model/MenuList';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly ORDER_API_URL: string = 'http://localhost:8080/orders/';

  constructor(private httpClient: HttpClient) { }

  public getAllItems(): Observable<Order[]> {
    return this.httpClient.post<Order[]>(this.ORDER_API_URL + 'fetch-order-all', null, {})
    .pipe(catchError(this.handleError)); // Handle errors
  }

  private handleError(error: HttpErrorResponse) {
    // Handle different types of errors (network, server, etc.)
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }

}
