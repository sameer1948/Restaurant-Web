import { Component, Inject } from '@angular/core';
import { CustomUserDetails } from '../../model/CustomUserDetails';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../model/User';
import { UserDetails } from '../../model/UserDetails';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrl: './update-member.component.scss'
})
export class UpdateMemberComponent {
  
  private secretKey = `${environment.secretKey}`; 

  userForm: FormGroup;
  showPassword: boolean = false;
  availableRoles: string[] = ['ADMIN', 'USER', 'MODERATOR', 'GUEST'];
  availableGender: string[] = ['Male', 'Female']; // remove after clean up

  user: User = {
    username: '',
    password: '',
    roles: '',
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
    enabled: true
  };

  userDetails: UserDetails = {
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    securityNumber: ''
  };

  constructor(private matDialogRef: MatDialogRef<UpdateMemberComponent>,
    @Inject(MAT_DIALOG_DATA) data: CustomUserDetails,
    private formBuilder: FormBuilder, private userService: UserService) {

    this.userForm = this.formBuilder.group(
      {
        firstName: [data.customUserDetails.firstName, Validators.required],
        middleName: [data.customUserDetails.middleName],
        lastName: [data.customUserDetails.lastName, Validators.required],
        gender: ['male', Validators.required], // Need Adde the Gender
        email: [data.customUserDetails.email, [Validators.required, Validators.email]],
        phone: [data.customUserDetails.phone, [Validators.required, Validators.maxLength(10)]],
        address: [data.customUserDetails.address, [Validators.required]],
        securityNumber: [data.customUserDetails.securityNumber, [Validators.required]],

        username: [{ value: data.customUser.username, disabled: false }, [Validators.required, Validators.minLength(6)]],
        password: [this.decryptPassword(data.customUser.password), [Validators.required, Validators.minLength(6)]],
        roles: [[data.customUser.roles], Validators.required],
        accountNonExpired: [data.customUser.accountNonExpired],
        accountNonLocked: [data.customUser.accountNonLocked],
        credentialsNonExpired: [data.customUser.credentialsNonExpired],
        enabled: [data.customUser.enabled]
      }
    );

  }

  ngOnInit() { }

  public generatePassword(): void {
    this.userForm.patchValue({ password: Math.random().toString(36).slice(-8) });
  }

  public updateSelectedRoles(selectedRoles: string[]): void {
    this.userForm.patchValue({ roles: selectedRoles });
  }

  onGenderSelect(genderValue: string): void {
    this.userForm.get('gender')?.setValue(genderValue);
  }

  public updateUser(): void {
    if (this.userForm.valid) {

      const customUser: CustomUserDetails = {
        customUser: {
          username: this.userForm.value.username,
          password: this.userForm.value.password,
          roles: this.userForm.value.roles.join(', '),
          accountNonExpired: this.userForm.value.accountNonExpired,
          accountNonLocked: this.userForm.value.accountNonLocked,
          credentialsNonExpired: this.userForm.value.credentialsNonExpired,
          enabled: this.userForm.value.enabled,
        },
        customUserDetails: {
          username: this.userForm.value.username,
          firstName: this.userForm.value.firstName,
          middleName: this.userForm.value.middleName,
          lastName: this.userForm.value.lastName,
          email: this.userForm.value.email,
          phone: this.userForm.value.phone,
          address: this.userForm.value.address,
          securityNumber: this.userForm.value.securityNumber,
        }
      };
      console.log('User customUser:', customUser);

      this.userService.updateUser(customUser).subscribe(
        (response) => {
          console.log(response);
          this.matDialogRef.close('success');
        }, (error) => { }
      );
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }


  // XOR Decrypt password (the same as encoding in reverse)
  private decryptPassword(encodedPassword: string): string {
    //console.log('Encoded Password received from backend:', encodedPassword);

    let decodedPassword = '';
    let keyIndex = 0;

    for (let i = 0; i < encodedPassword.length; i++) {
      decodedPassword += String.fromCharCode(encodedPassword.charCodeAt(i) ^ this.secretKey.charCodeAt(keyIndex));
      keyIndex = (keyIndex + 1) % this.secretKey.length; // Loop through the key
    }

    //console.log('Decoded Password:', decodedPassword);
    return decodedPassword;
  }

}
