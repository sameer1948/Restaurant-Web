import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const decryptService = inject(EncryptDecryptService);
  const TOKEN_NAME: string = 'JWT_TOKEN';  

  try {
    const encryptedToken = sessionStorage.getItem(decryptService.encrypt(TOKEN_NAME));

    if (encryptedToken) {
      const token = decryptService.decrypt(encryptedToken);
      return next(req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      }));
    }
  } catch (error) {
    console.error('Error accessing sessionStorage or decrypting token:', error);
  }

  return next(req); // Always ensure this line is reached
};


// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const decryptService = inject(EncryptDecryptService);
//   const TOKEN_NAME: string = 'JWT_TOKEN';  
//   const encryptedToken = sessionStorage.getItem(decryptService.encrypt(TOKEN_NAME));

//   if (encryptedToken) {
//     try {
//       const token = decryptService.decrypt(encryptedToken);
//       console.log(`Token retrieved: ${token}`);
      
//       // Optionally, check for token expiry here
//       // if (isTokenExpired(token)) {
//       //   // Handle token expiry (e.g., redirect to login)
//       //   return next(req); // or handle accordingly
//       // }

//       return next(req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       }));
//     } catch (error) {
//       console.error('Error decrypting token:', error);
//       // Optionally handle error (e.g., logout user)
//     }
//   }

//   // If no token or error, just proceed with the request
//   return next(req);
// };

// // Optionally implement a token expiry check function
// // function isTokenExpired(token: string): boolean {
// //   const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
// //   return payload.exp * 1000 < Date.now(); // Check expiry
// // }
