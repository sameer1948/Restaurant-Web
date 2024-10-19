import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const decryptService = inject(EncryptDecryptService)

  const TOKEN_NAME : string = 'JWT_TOKEN';  
  const token = sessionStorage.getItem(decryptService.encrypt(TOKEN_NAME));

  console.log(`token-> ${token}`)
  
  if (token) {    
    return next(req.clone({setHeaders : { Authorization : `Bearer ${decryptService.decrypt(token)}`, },}));
  }
  return next(req);
};