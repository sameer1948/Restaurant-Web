import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuList } from '../model/MenuList';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private MENU_API_URL: string = 'http://localhost:8080/admin/';


  constructor(private httpClient: HttpClient) { }

  public getAllItems() : Observable<MenuList[]> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<MenuList[]>(this.MENU_API_URL + 'fetch-all-menu', null, {headers : headers});
  }

  public createNew(menuList : MenuList) : Observable<MenuList> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<MenuList>(this.MENU_API_URL + 'add-menu', menuList, {headers : headers});
  }
  
}
