import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenicationService } from '../services/authenication.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  
  readonly APPLICATION_NAME = 'My Restaurant';
  
  readonly ROLE_ADMIN = 'ADMIN';
  readonly ROLE_USER = 'USER';

  badgevisible: boolean = false;
  @ViewChild('drawer') drawer!: MatDrawer;

  isAuthenticated$: Observable<boolean>;
  userRole$: Observable<string | null>;

  constructor(private authenticationService: AuthenicationService, private routerService: Router) {
    this.isAuthenticated$ = this.authenticationService.isAuthenticated$;
    this.userRole$ = this.authenticationService.userRole$;
  }

  ngOnInit(): void {
    this.checkSize(); 
  }
  
  private checkSize() {
    if (typeof window !== 'undefined') { // Check if window is defined
      window.addEventListener('resize', () => {
        if (this.isMobileScreen()) {
          this.drawer.mode = 'over';
          this.drawer.close();
        } else {
          this.drawer.mode = 'side';
          this.drawer.open();
        }
      });
    }
  }
 
  private isMobileScreen(): boolean {
    return window.innerWidth < 600;
  }

  // Log out the user and reset authentication state
  public logout(): void {
    this.authenticationService.clearTokens();
    this.routerService.navigate(['/login']);
  }
}
