import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly ORDER_API_URL: string = 'http://localhost:8080/orders/';
  
  readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'  // Explicitly accept JSON response
  });

  constructor(private httpClient: HttpClient) { }

  public newOrder(order : any) : Observable<Order> {
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'  // Explicitly accept JSON response
    });
    
    return this.httpClient.post<Order>(`${this.ORDER_API_URL}new-order`, order, { headers });
  }

  public getOrders() : Observable<Order[]> { 

    return this.httpClient.get<Order[]>(`${this.ORDER_API_URL}fetch-orders`)
    //.pipe(catchError(this.handleError)); // Handle errors

  }
  
  
  public cancelOrder(orderId : string, order : Order) : Observable<Order> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'  // Explicitly accept JSON response
    });
    
    return this.httpClient.patch<Order>(`${this.ORDER_API_URL}update-order/${orderId}`, order, {headers})
  }

  // private handleError(error: HttpErrorResponse) {
  //   // Handle different types of errors (network, server, etc.)
  //   console.error('An error occurred:', error.message);
  //   return throwError('Something went wrong; please try again later.');
  // }

}
