import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../model/LoginRequest';
import { LoginResponse } from '../model/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenicationService {

  private AUTHENTICATION_API_URL: string = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) { }

  authenticate(loginRequest : LoginRequest) : Observable<LoginResponse> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<LoginResponse>(this.AUTHENTICATION_API_URL + 'authenticate', loginRequest, {headers : headers});
  }
  
}
