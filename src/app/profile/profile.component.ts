import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { UserService } from '../services/user.service';
import { CustomUserDetails } from '../model/CustomUserDetails';
import { User } from '../model/User';
import { EncryptDecryptService } from '../services/encrypt-decrypt.service';
import { ErrorDialogComponent } from '../common/error-dialog/error-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  
  private readonly USER_NAME: string = 'USERNAME';
  userName: any;

  personalInfoForm: FormGroup;
  user: User; 
  genders : string[] = ['Male', 'Female'];

  constructor(private userService: UserService, 
    private fb: FormBuilder, 
    public dialog: MatDialog,
    private decryptServices: EncryptDecryptService) {

    this.userName = this.decryptServices.decrypt(sessionStorage.getItem(this.decryptServices.encrypt(this.USER_NAME)) ?? '');

    this.personalInfoForm = this.fb.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      gender:[''],
      email: [''],
      phone: [''],
      address: [''],
      securityNumber: ['']
    });

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
    
      this.personalInfoForm.patchValue({
        firstName: customUserDetails.customUserDetails.firstName,
        middleName: customUserDetails.customUserDetails.middleName,
        lastName: customUserDetails.customUserDetails.lastName,
        gender:'Male', // need to chnage gender
        email: customUserDetails.customUserDetails.email,
        phone: customUserDetails.customUserDetails.phone,
        address: customUserDetails.customUserDetails.address,
        securityNumber: customUserDetails.customUserDetails.securityNumber
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
    this.personalInfoForm.patchValue({ gender: gender });
  }

  save() {
    console.log(this.personalInfoForm.value);
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
}