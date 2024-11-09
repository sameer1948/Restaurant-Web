import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest } from '../model/LoginRequest';
import { LoginResponse } from '../model/LoginResponse';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthenicationService {

  private readonly TOKEN_NAME: string = 'JWT_TOKEN';
  private readonly USER_ROLE: string = 'USER_ROLE';
  private readonly REFRESH_TOKEN: string = 'REFRESH_TOKEN';
  private readonly USER_NAME: string = 'USERNAME';

  private readonly AUTHENTICATION_API_URL: string = 'http://localhost:8080/auth/';
  private readonly CONTENT_TYPE = { 'content-type': 'application/json' };

  public redirectUrl: string | null = null;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  private userRoleSubject = new BehaviorSubject<string | null>(this.getUserRole());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private httpClient: HttpClient,
    private encryptService: EncryptDecryptService,
    @Inject(PLATFORM_ID) private platformId: Object) { }


  public authenticate(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(this.AUTHENTICATION_API_URL + 'authenticate', loginRequest, { headers: this.CONTENT_TYPE })
      .pipe(
        tap((response) => {
          if (response.statusCode === 202) {
            const uersName = this.getUserName(response.message) ?? 'User : NA Authenticated .. !';
            this.storeTokens(response.token, response.role, response.refreshToken, uersName);
            this.isAuthenticatedSubject.next(true); // User authenticated
            this.userRoleSubject.next(response.role); // Set user role
          }
        })
      );
  }

  private storeTokens(token: string, role: string, refreshToken: string, userName : string): void {
    sessionStorage.setItem(this.encryptService.encrypt(this.TOKEN_NAME), this.encryptService.encrypt(token));
    sessionStorage.setItem(this.encryptService.encrypt(this.USER_ROLE), this.encryptService.encrypt(role));
    sessionStorage.setItem(this.encryptService.encrypt(this.REFRESH_TOKEN), this.encryptService.encrypt(refreshToken));
    sessionStorage.setItem(this.encryptService.encrypt(this.USER_NAME), this.encryptService.encrypt(userName));
  }

  public clearTokens(): void {
    sessionStorage.clear();
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next(null);
  }

  public isAuthenticated(): boolean {
    return isPlatformBrowser(this.platformId)
      ? !!sessionStorage.getItem(this.encryptService.encrypt(this.TOKEN_NAME))
      : false;
  }

  public getUserRole(): string | null {
    return isPlatformBrowser(this.platformId)
      ? sessionStorage.getItem(this.encryptService.encrypt(this.USER_ROLE))
        ? this.encryptService.decrypt(sessionStorage.getItem(this.encryptService.encrypt(this.USER_ROLE))!)
        : null
      : null;
  }

  private getUserName(input: string): string {
    // Find the position where "User :" ends and "Authenticated .. !" starts
    const startIndex = input.indexOf("User :") + "User :".length;
    const endIndex = input.indexOf("Authenticated .. !");

    // Extract the substring between the two positions, trim any extra spaces
    return input.substring(startIndex, endIndex).trim();
  }
}
