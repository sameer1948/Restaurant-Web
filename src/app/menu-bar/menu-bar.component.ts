import { Component, OnInit } from '@angular/core';
import { AuthenicationService } from '../services/authenication.service';
import { Router } from '@angular/router';
import { EncryptDecryptService } from '../services/encrypt-decrypt.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent implements OnInit{

  readonly APPLICATION_NAME = 'My Restautant';
  readonly ROLE_ADMIN = 'ADMIN';
  readonly ROLE_USER = 'USER';

  badgevisible : boolean = false;
/*   isAuthenticated : boolean = false;
  isAdmin : boolean = false;
  isUser : boolean = false; */
  
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  private isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdmin.asObservable();
  
  private isUser = new BehaviorSubject<boolean>(false);
  isUser$ = this.isUser.asObservable();
  
  constructor(private authenticationService : AuthenicationService, 
    private routerService : Router,
    private decrypt : EncryptDecryptService ) {}
  
  ngOnInit() : void {

    this.isAuthenticated.next(this.authenticationService.isAuthenticated());  
    let role = this.authenticationService.getUserRole();

    if(this.decrypt.decrypt(role != null ? role : '') === this.ROLE_ADMIN) {
      this.isAdmin.next(true);
    }

    if(this.decrypt.decrypt(role != null ? role : '') === this.ROLE_USER) {
      this.isUser.next(true);
    }

  }

  public badgevisibility() : void {
    this.badgevisible = true;
  }

  public logout() : void {
    this.authenticationService.clearTokens()
    this.isAuthenticated.next(false);    
    this.isAdmin.next(false);
    this.isUser.next(false);
    this.routerService.navigate(['/login']);
  }



}
