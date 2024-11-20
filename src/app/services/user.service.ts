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

  // public getAllItems(): Observable<MenuList[]> {
  //   return this.httpClient.get<MenuList[]>(this.MENU_API_URL + 'fetch-menus');
  //    // .pipe(catchError(this.handleError));  // Handle errors
  // }
  

  public newUser(customUserDetails : CustomUserDetails) : Observable<CustomUserDetails> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<CustomUserDetails>(`${this.USER_API_URL}new-user`, customUserDetails, {headers : headers});
  }

  public updateUser(customUserDetails : CustomUserDetails) : Observable<CustomUserDetails> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<CustomUserDetails>(`${this.USER_API_URL}update-user`, customUserDetails, {headers : headers});
  }

  public removeUser(customUserDetails : CustomUserDetails) : Observable<CustomUserDetails> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<CustomUserDetails>(`${this.USER_API_URL}remove-user`, customUserDetails, {headers : headers});
  }

}
