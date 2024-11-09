import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tax } from '../model/Tax';
import { Coupon } from '../model/Coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private COUPON_API_URL: string = 'http://localhost:8080/coupons/';

  constructor(private httpClient: HttpClient) { }

  public getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.COUPON_API_URL + 'fetch-coupons');     
  }
}
