import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tax } from '../model/Tax';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  private TAX_API_URL: string = 'http://localhost:8080/taxes/';

  constructor(private httpClient: HttpClient) { }

  public getAllTaxes(): Observable<Tax[]> {
    return this.httpClient.get<Tax[]>(this.TAX_API_URL + 'fetch-taxes');     
  }

}
