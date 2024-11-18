import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tax } from '../model/Tax';
import { Observable } from 'rxjs';
import { TaxAndDetails } from '../model/TaxAndDetails';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  private TAX_API_URL: string = 'http://localhost:8080/taxes/';

  constructor(private httpClient: HttpClient) { }

  public newTax(taxAndDetails : TaxAndDetails) : Observable<TaxAndDetails> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<TaxAndDetails>(`${this.TAX_API_URL}new-tax`, taxAndDetails, {headers : headers});
  }
  
  public getTaxes(): Observable<TaxAndDetails[]> {
    return this.httpClient.get<TaxAndDetails[]>(`${this.TAX_API_URL}fetch-taxes`);     
  }

}
