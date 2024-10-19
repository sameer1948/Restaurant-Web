import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {
  
  private readonly key: string = 'sameersameersame';
  private readonly iv: string = 'reemasreemasreem'; 

   // Example of a 16-byte key (128 bits) for AES
   //private key: string = '1234567890abcdef'; // Must be 16 bytes
   //private iv: string = 'abcdef9876543210';  // Must be 16 bytes for AES
  
   // //constructor
   constructor() { }

   // Encrypt function
   encrypt(data: string): string {
     // Parse the key and IV as WordArray
     const key = CryptoJS.enc.Utf8.parse(this.key);
     const iv = CryptoJS.enc.Utf8.parse(this.iv);
     
     // Encrypt the data
     const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
     
     // Return the encrypted data as a string
     return encrypted.toString();
   }
 
   // Decrypt function
   decrypt(cipherText: string): string | null {
     // Parse the key and IV as WordArray
     const key = CryptoJS.enc.Utf8.parse(this.key);
     const iv = CryptoJS.enc.Utf8.parse(this.iv);
     
     // Decrypt the ciphertext
     const decrypted = CryptoJS.AES.decrypt(cipherText, key, { iv: iv });
     
     // Convert the decrypted data to a string
     const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
     
     // Return decrypted string or null if decryption fails
     return decryptedText.length > 0 ? decryptedText : null;
   }


/*   public encrypt(data: string): string {
    const iv = CryptoJS.enc.Utf8.parse(this.iv);
    const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(this.key), { iv: iv });
    return encrypted.toString();
  }

  public decrypt(cipherText: string): string {
    const iv = CryptoJS.enc.Utf8.parse(this.iv);
    const decrypted = CryptoJS.AES.decrypt(cipherText, CryptoJS.enc.Utf8.parse(this.key), { iv: iv });
    const res = decrypted.toString(CryptoJS.enc.Utf8);
    console.log(" res" + res)
    return res; 
  }*/

  
}

