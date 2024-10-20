import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenicationService } from '../services/authenication.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authenicationService = inject(AuthenicationService);
  const routerService = inject(Router) 
 
  if (authenicationService.isAuthenticated()) {    
    return true;
  } else {
    // fetches the destination url
    authenicationService.redirectUrl = state.url;
    routerService.navigate(['/login']);
    return false;
  }
  

};
