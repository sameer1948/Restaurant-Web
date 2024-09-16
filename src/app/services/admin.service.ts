import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private API_URL: string = 'http://localhost:8877/';


  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<Branch[]> {
    return this.httpClient.get<Branch[]>(this.API_URL + 'getbranchs');
    
  }

  

}

export interface Branch {
  branchId: number;
  branchName: string;
  branchLocation: string;
}
