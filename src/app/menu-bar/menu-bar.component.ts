import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenicationService } from '../services/authenication.service';
import { Router } from '@angular/router';
import { EncryptDecryptService } from '../services/encrypt-decrypt.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent implements OnInit{
  //@ViewChild('drawer') drawer!: MatDrawer;

  readonly APPLICATION_NAME = 'My Restautant';
  readonly ROLE_ADMIN = 'ADMIN';
  readonly ROLE_USER = 'USER';
  
  badgevisible : boolean = false;
  
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
    //this.checksize();

    this.isAuthenticated.next(this.authenticationService.isAuthenticated());  
    let role = this.authenticationService.getUserRole();

    if(this.decrypt.decrypt(role != null ? role : '') === this.ROLE_ADMIN) {
      this.isAdmin.next(true);
    }

    if(this.decrypt.decrypt(role != null ? role : '') === this.ROLE_USER) {
      this.isUser.next(true);
    }

  }

  checksize() {
    window.addEventListener('resize', () => {
      if (this.isMobileScreen()) {
          this.drawer.mode = 'over';
          this.drawer.close(); // Automatically close on smaller screens
      } else {
          this.drawer.mode = 'side';
          this.drawer.open(); // Automatically open on larger screens
      }
  });
  }

  private toggleDrawer() : void{
    this.drawer.toggle();
  }

  private isMobileScreen() : boolean {
    return window.innerWidth < 600;
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
