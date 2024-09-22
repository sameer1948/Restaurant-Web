import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuList } from '../model/MenuList';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private MENU_API_URL: string = 'http://localhost:8080/admin/';
  private API_URL: string = 'http://localhost:8877/';

  constructor(private httpClient: HttpClient) { }

  addItemToMenu(menu : MenuList) : Observable<MenuList> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<MenuList>(this.MENU_API_URL + 'add-menu', menu, {headers : headers});
  }
  
  modifyItemInMenu(menu : MenuList) : Observable<MenuList> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.patch<MenuList>(this.MENU_API_URL + 'update-menu', menu, {headers : headers});
  }

  removeItemInMenu(id: number) : Observable<string> {    
    return this.httpClient.delete<string>(this.MENU_API_URL + 'delete-menu/' + id);
  }
  
  getAllItems() : Observable<MenuList[]> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.post<MenuList[]>(this.MENU_API_URL + 'fetch-all-menu', null, {headers : headers});
  }
  getEmployees(): Observable<Branch[]> {
    return this.httpClient.get<Branch[]>(this.API_URL + 'getbranchs');
    
  }

  

}

export interface Branch {
  branchId: number;
  branchName: string;
  branchLocation: string;
}

