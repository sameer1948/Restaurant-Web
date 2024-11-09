import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenicationService } from '../services/authenication.service';

export const roleAdminGuard: CanActivateFn = (route, state) => {

  const authenicationService = inject(AuthenicationService);
  const routerService = inject(Router);
  const ROLE_ADMIN = 'ADMIN';

  let role = authenicationService.getUserRole();

  if (role != null && role === ROLE_ADMIN) {
    return true;
  } else {
    routerService.navigate(['/unauthorized']);
    return false;
  }
  
};
