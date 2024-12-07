import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomUserDetails } from '../model/CustomUserDetails';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USER_API_URL: string = `${environment.apiUrl}user/`;


  constructor(private httpClient: HttpClient) { }  

  public newUser(customUserDetails : CustomUserDetails) : Observable<CustomUserDetails> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<CustomUserDetails>(`${this.USER_API_URL}new-user`, customUserDetails, {headers : headers});
  }

  public getUserByName(userName : string) : Observable<CustomUserDetails> {
    return this.httpClient.get<CustomUserDetails>(`${this.USER_API_URL}fetch-user/${userName}`);
  }

  public getMembers() : Observable<CustomUserDetails[]> {    
    return this.httpClient.get<CustomUserDetails[]>(this.USER_API_URL + 'fetchd-users');
  }
  
  public updateUser(customUserDetails : CustomUserDetails) : Observable<CustomUserDetails> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<CustomUserDetails>(`${this.USER_API_URL}update-user`, customUserDetails, {headers : headers});
  }

  public updatePassword(userName : string, password: string) : Observable<CustomUserDetails> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<CustomUserDetails>(`${this.USER_API_URL}update-password/${userName}`, password, {headers : headers});
  }

  public removeUser(customUserDetails : CustomUserDetails) : Observable<CustomUserDetails> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<CustomUserDetails>(`${this.USER_API_URL}remove-user`, customUserDetails, {headers : headers});
  }

}
