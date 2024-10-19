import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../model/LoginRequest';
import { LoginResponse } from '../model/LoginResponse';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenicationService {
  
  private readonly TOKEN_NAME : string = 'JWT_TOKEN';
  private readonly USER_ROLE : string = 'USER_ROLE';
  private readonly REFRESH_TOKEN : string = 'REFRESH_TOKEN';

  private readonly AUTHENTICATION_API_URL: string = 'http://localhost:8080/auth/';
  private readonly CONTENT_TYPE = { 'content-type': 'application/json'}  ;
 

  constructor(private httpClient: HttpClient, 
    private encryptService : EncryptDecryptService,  
    @Inject(PLATFORM_ID) private platformId: Object) { }

  public authenticate(loginRequest : LoginRequest) : Observable<LoginResponse> {
    
    let loginResponse = this.httpClient.post<LoginResponse>(this.AUTHENTICATION_API_URL + 'authenticate', loginRequest, {headers : this.CONTENT_TYPE})
    loginResponse.subscribe(
      (response) => {
        if (response.statusCode === 202) {
          this.storeToken(response.token, response.role, response.refreshToken);
        }
      });
    return loginResponse;
  } 

  private storeToken(token : string, role : string, refreshToken : string) : void {    
    sessionStorage.setItem(this.encryptService.encrypt(this.TOKEN_NAME), this.encryptService.encrypt(token));
    sessionStorage.setItem(this.encryptService.encrypt(this.USER_ROLE), this.encryptService.encrypt(role));
    sessionStorage.setItem(this.encryptService.encrypt(this.REFRESH_TOKEN), this.encryptService.encrypt(refreshToken));
 
  }  

  public isAuthenticated() : boolean {  
    return isPlatformBrowser(this.platformId) ? !! sessionStorage.getItem(this.encryptService.encrypt(this.TOKEN_NAME)) : false;    
  }

  public getUserRole() : string | null {
    
    if (sessionStorage.length > 1) {
      return sessionStorage.getItem(this.encryptService.encrypt(this.USER_ROLE)) != null ? 
      sessionStorage.getItem(this.encryptService.encrypt(this.USER_ROLE)) : null;
    }
    return null;

  }

  public getRefreshToken() : string | null {
    
    if (sessionStorage.length > 1) {
      return sessionStorage.getItem(this.encryptService.encrypt(this.REFRESH_TOKEN)) != null ? 
      sessionStorage.getItem(this.encryptService.encrypt(this.USER_ROLE)) : null;
    }
    return null;

  }

  getItem(): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/admin/fetch-menu/11", null, {headers : this.CONTENT_TYPE});
  }

  
}
