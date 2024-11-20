import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomUserDetails } from '../model/CustomUserDetails';

@Injectable({
  providedIn: 'root'
})
export class AdminService {  
  
  private USER_API_URL: string = 'http://localhost:8080/user/';

  constructor(private httpClient: HttpClient) { }

  getAllUsers() : Observable<CustomUserDetails[]> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<CustomUserDetails[]>(this.USER_API_URL + 'fetch-users', null, {headers : headers});
  }

  public getMembers() : Observable<CustomUserDetails[]> {    
    return this.httpClient.get<CustomUserDetails[]>(this.USER_API_URL + 'fetch-users');
  }
  
  
  addUser(newUser: CustomUserDetails) {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<CustomUserDetails[]>(this.USER_API_URL + 'fetch-all-user', null, {headers : headers});
  }


  deleteUser(username: any) {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<CustomUserDetails[]>(this.USER_API_URL + 'fetch-all-user', null, {headers : headers});
  }
  
  
  updateUser(user: CustomUserDetails) {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<CustomUserDetails[]>(this.USER_API_URL + 'fetch-all-user', null, {headers : headers});
  }
  

}
