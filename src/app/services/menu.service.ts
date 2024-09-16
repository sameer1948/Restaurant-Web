import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { menuList } from '../model/menuList';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private MENU_API_URL: string = 'http://localhost:8080/admin/';


  constructor(private httpClient: HttpClient) { }

  getAllItems() : Observable<menuList[]> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<menuList[]>(this.MENU_API_URL + 'fetch-all-menu', null, {headers : headers});
  }
}
