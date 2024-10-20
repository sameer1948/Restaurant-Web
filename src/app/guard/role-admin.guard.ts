import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenicationService } from '../services/authenication.service';
import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

export const roleAdminGuard: CanActivateFn = (route, state) => {
  
  const authenicationService = inject(AuthenicationService);
  const routerService = inject(Router);
  const decrypt =  inject(EncryptDecryptService);
  let role = authenicationService.getUserRole();
  const ROLE_ADMIN = 'ADMIN'

  if (role != null && decrypt.decrypt(role) === ROLE_ADMIN) {            
    return true;
  } else {  
    routerService.navigate(['/unauthorized']); 
    return false;
  }
};
