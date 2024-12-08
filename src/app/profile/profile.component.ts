import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { UserService } from '../services/user.service';
import { CustomUserDetails } from '../model/CustomUserDetails';
import { User } from '../model/User';
import { EncryptDecryptService } from '../services/encrypt-decrypt.service';
import { ErrorDialogComponent } from '../common/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../common/success-dialog/success-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  
  private secretKey = `${environment.secretKey}`;  // Secret Key for password decryption
  
  private readonly USER_NAME: string = 'USERNAME';
  userName: any;

  personalInfoForm!: FormGroup;

  user: User; 
  genders : string[] = ['Male', 'Female'];

  constructor(private userService: UserService, 
    private formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private decryptServices: EncryptDecryptService) {

    this.userName = this.decryptServices.decrypt(sessionStorage.getItem(this.decryptServices.encrypt(this.USER_NAME)) ?? '');

    this.user = {
      username: '',
      password: '', 
      roles: '', 
      accountNonExpired: false,
      accountNonLocked: false,
      credentialsNonExpired: false,
      enabled: false
    };

    this.userService.getUserByName(this.userName).subscribe(
      (customUserDetails: CustomUserDetails) => {
        //console.log(customUserDetails);
      
        this.user = customUserDetails.customUser;

      this.personalInfoForm = this.formBuilder.group({
        firstName: [customUserDetails.customUserDetails.firstName, Validators.required],
        middleName: [customUserDetails.customUserDetails.middleName],
        lastName: [customUserDetails.customUserDetails.lastName, Validators.required],
        gender: [customUserDetails.customUserDetails.gender, Validators.required],
        age: [customUserDetails.customUserDetails.age, [Validators.required, Validators.min(20), Validators.max(50)]],
        email: [customUserDetails.customUserDetails.email, [Validators.required, Validators.email]],
        phone: [customUserDetails.customUserDetails.phone, [Validators.required, Validators.maxLength(10)]],
        address: [customUserDetails.customUserDetails.address, [Validators.required]],
        securityNumber: [customUserDetails.customUserDetails.securityNumber, [Validators.required]],

        username: [{ value: customUserDetails.customUser.username, disabled: false }, [Validators.required, Validators.minLength(6)]],
        password: [this.decryptPassword(customUserDetails.customUser.password), [Validators.required, Validators.minLength(6)]],
        roles: [customUserDetails.customUser.roles.split(','), Validators.required],
        accountNonExpired: [customUserDetails.customUser.accountNonExpired],
        accountNonLocked: [customUserDetails.customUser.accountNonLocked],
        credentialsNonExpired: [customUserDetails.customUser.credentialsNonExpired],
        enabled: [customUserDetails.customUser.enabled]
      });
    },
    (error) => {
      console.log(error)
      const data = {
        title : `Error `,
        message : `Something Went Wrong...! <br>Please try Later`,
        action : 'close'
      }
      this.dialog.open(ErrorDialogComponent, 
      {
        data: data,
        width: '400px',  
        maxHeight: '80vh', 
      });
    });
  }

  ngOnInit(): void {}

  public updateGender(gender: string) : void {
    this.personalInfoForm!.patchValue({ gender: gender });
  }

  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {      
      data: { username: this.userName , password : this.user.password},
      width:'30%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle password change logic here
        console.log('Password changed:', result);
      }
    });
  }  

  public save() {
    if (this.personalInfoForm!.valid) {

      const customUser: CustomUserDetails = {
        customUser: {
          username:  this.user.username,
          password: this.decryptPassword(this.user.password),
          roles: this.user.roles,
          accountNonExpired: this.user.accountNonExpired,
          accountNonLocked: this.user.accountNonLocked,
          credentialsNonExpired: this.user.credentialsNonExpired,
          enabled: this.user.enabled,
        },
        customUserDetails: {
          username: this.user.username,
          firstName: this.personalInfoForm!.value.firstName,
          middleName: this.personalInfoForm!.value.middleName,
          lastName: this.personalInfoForm!.value.lastName,
          gender: this.personalInfoForm!.value.gender,
          age: this.personalInfoForm!.value.age,
          email: this.personalInfoForm!.value.email,
          phone: this.personalInfoForm!.value.phone,
          address: this.personalInfoForm!.value.address,
          securityNumber: this.personalInfoForm!.value.securityNumber,
        }
      };
      console.log('User customUser:', customUser);

      this.userService.updateUser(customUser).subscribe(
        (response) => {
          //console.log(response);
          const data = {
            title: 'Member Created successfully',
            message: `User Name : ${response.customUser.username} <br>Roles : ${response.customUser.roles} `,
            action: 'success'
          }
          this.dialog.open(SuccessDialogComponent, { data: data })            
        }, (error) => {
          console.log(error)
          const data = {
            title: `Error `,
            message: `Something Went Wrong...! <br>Please try Later`,
            action: 'close'
          }
          this.dialog.open(ErrorDialogComponent,
            {
              data: data,
              width: '400px',
              maxHeight: '80vh',
            });
        }
      );
    } else {
      this.personalInfoForm!.markAllAsTouched();
    }
  }

    // Decrypt the old password using XOR (ensure it's secure)
  private decryptPassword(encodedPassword: string): string {
    let decodedPassword = '';
    let keyIndex = 0;
    for (let i = 0; i < encodedPassword.length; i++) {
      decodedPassword += String.fromCharCode(encodedPassword.charCodeAt(i) ^ this.secretKey.charCodeAt(keyIndex));
      keyIndex = (keyIndex + 1) % this.secretKey.length; 
    }
    return decodedPassword;
  }
  

}