import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { MenuList } from '../model/MenuList';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private MENU_API_URL: string = 'http://localhost:8080/admin/';


  constructor(private httpClient: HttpClient) { }

  public getAllItems(): Observable<MenuList[]> {
    return this.httpClient.post<MenuList[]>(this.MENU_API_URL + 'fetch-all-menu', null, {})
    .pipe(catchError(this.handleError)); // Handle errors
  }

  public addItemToMenu(menu : MenuList) : Observable<MenuList> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<MenuList>(this.MENU_API_URL + 'add-menu', menu, {headers : headers});
  }

  public modifyItemInMenu(menu : MenuList) : Observable<MenuList> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.patch<MenuList>(this.MENU_API_URL + 'update-menu', menu, {headers : headers});
  }

  public removeItemInMenu(id: number) : Observable<string> {    
    return this.httpClient.delete<string>(this.MENU_API_URL + 'delete-menu/' + id);
  }


  private handleError(error: HttpErrorResponse) {
    // Handle different types of errors (network, server, etc.)
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }


}
