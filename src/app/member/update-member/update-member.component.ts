import { Component, Inject, Input } from '@angular/core';
import { CustomUserDetails } from '../../model/CustomUserDetails';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../model/User';
import { UserDetails } from '../../model/UserDetails';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrl: './update-member.component.scss'
})
export class UpdateMemberComponent { 
  
  userForm: FormGroup;

  user: User = {
    username : '',
    password : '',
    roles : '',
    accountNonExpired : true,
    accountNonLocked : true,
    credentialsNonExpired : true,
    enabled : true
  };

  userDetails: UserDetails = {
    username : '',
    firstName : '',
    middleName : '',
    lastName : '',
    email : '',
    phone : '',
    address : '',
    securityNumber : ''
  };

  availableRoles : string[] = ['ADMIN', 'USER', 'MODERATOR', 'GUEST'];
  availableGender: string[] = ['Male', 'Female']; // remove after clean up
  showPassword: boolean = false;
  generatedUsername: string = '';  // remove after clean up
  generatedPassword: string = ''; // remove after clean up

  constructor(private matDialogRef :  MatDialogRef<UpdateMemberComponent>,
    @Inject(MAT_DIALOG_DATA) data: CustomUserDetails,
    private formBuilder: FormBuilder) {

    this.userForm = this.formBuilder.group(
      {        
        firstName : [data.customUserDetails.firstName, Validators.required],
        middleName : [data.customUserDetails.middleName],
        lastName : [data.customUserDetails.lastName, Validators.required],
        email : [data.customUserDetails.email, [Validators.required, Validators.email]],
        phone : [data.customUserDetails.phone, [Validators.required, Validators.maxLength(10)]],
        address : [data.customUserDetails.address, [Validators.required]],
        securityNumber : [data.customUserDetails.securityNumber, [Validators.required]],        

        username : [{value : data.customUser.username, disabled: false}, [Validators.required, Validators.minLength(6)]],        
        password : [data.customUser.password, [Validators.required, Validators.minLength(6)]],
        roles : [[data.customUser.roles], Validators.required], 
        accountNonExpired : [data.customUser.accountNonExpired],
        accountNonLocked : [data.customUser.accountNonLocked],
        credentialsNonExpired : [data.customUser.credentialsNonExpired],
        enabled : [data.customUser.enabled]
      }
    );

  }

  ngOnInit() {}

  public generatePassword() : void {
    
    this.generatedPassword = Math.random().toString(36).slice(-8);
    this.userForm.patchValue({ password: this.generatedPassword });
  }

  public updateSelectedRoles(selectedRoles: string[]) : void {
    this.userForm.patchValue({ roles: selectedRoles });
  }

  public updateUser() : void{
    if (this.userForm.valid) {
      const userData = {
        ...this.user,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        roles: this.userForm.value.roles.join(', '), // Join selected roles into a string
        details: {
          ...this.userDetails,
          firstName: this.userForm.value.firstName,
          lastName: this.userForm.value.lastName,
          email: this.userForm.value.email,
          phone: this.userForm.value.phone,
        }
      };

      console.log('User created:', userData);
      // Call your service to save `userData` to the database here

      this.matDialogRef.close('success');
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  public closeDialog() : void {
    this.matDialogRef.close();
  }

}
