import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CouponAndDetails } from '../model/CouponAndDetails';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private COUPON_API_URL: string = `${environment.apiUrl}coupons/`;

  constructor(private httpClient: HttpClient) { }

  public addCoupon(couponAndDetails : CouponAndDetails) : Observable<CouponAndDetails> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<CouponAndDetails>(this.COUPON_API_URL + 'add-coupon', couponAndDetails, {headers : headers});
  }

  public getAllCoupons(): Observable<CouponAndDetails[]> {
    return this.httpClient.get<CouponAndDetails[]>(this.COUPON_API_URL + 'fetch-coupons');     
  }

  public updateCoupon(couponAndDetails : CouponAndDetails) : Observable<CouponAndDetails> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'  // Explicitly accept JSON response
    });    
    return this.httpClient.patch<CouponAndDetails>(`${this.COUPON_API_URL}update-coupon`, couponAndDetails, {headers})
  }


}
