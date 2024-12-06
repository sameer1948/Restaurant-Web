import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/User';
import { CustomUserDetails } from '../../model/CustomUserDetails';
import { UserDetails } from '../../model/UserDetails';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.scss'
})
export class AddMemberComponent {
  
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
    gender : '',
    age : 20,
    email : '',
    phone : '',
    address : '',
    securityNumber : ''
  };

  availableRoles : string[] = ['ADMIN', 'USER', 'MODERATOR', 'GUEST'];
  availableGender: string[] = ['Male', 'Female']; 
  showPassword: boolean = false;
  generatedUsername: string = '';  
  generatedPassword: string = ''; 

  constructor(private matDialogRef: MatDialogRef<AddMemberComponent>,
    private formBuilder: FormBuilder, private userService : UserService) {

    this.userForm = this.formBuilder.group(
      {        
        firstName : ['', Validators.required],
        middleName : [''],
        lastName : ['', Validators.required],
        gender : ['', Validators.required],
        age : ['', [Validators.required, Validators.min(20), Validators.max(50)]],
        email : ['', [Validators.required, Validators.email]],
        phone : ['', [Validators.required, Validators.maxLength(10)]],
        address : ['', [Validators.required]],
        securityNumber : ['', [Validators.required]],        

        //username : [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]],        
        username : ['', [Validators.required, Validators.minLength(6)]],        
        password : ['', [Validators.required, Validators.minLength(6)]],
        roles : [[], Validators.required], 
        accountNonExpired : [true],
        accountNonLocked : [true],
        credentialsNonExpired : [true],
        enabled : [true]
      }
    );

  }

  ngOnInit() {}

  public generateUsername() : void  {
    const randomValue = Math.random().toString(36).substring(7);
    this.generatedUsername = `${this.userDetails.firstName}.${this.userDetails.lastName}.${randomValue}`;
    this.userForm.patchValue({ username: this.generatedUsername });
  }

  public generatePassword() : void {
    this.generatedPassword = Math.random().toString(36).slice(-8);
    this.userForm.patchValue({ password: this.generatedPassword });
  }

  public updateSelectedRoles(selectedRoles: string[]) : void {
    this.userForm.patchValue({ roles: selectedRoles });
  }

  onGenderSelect(genderValue: string): void {
    this.userForm.get('gender')?.setValue(genderValue);
  }

  public createUser() : void{
    if (this.userForm.valid) {

      const customUser : CustomUserDetails = {
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
          gender:this.userForm.value.gender,
          age:this.userForm.value.age,
          email: this.userForm.value.email,
          phone: this.userForm.value.phone,
          address: this.userForm.value.address,
          securityNumber: this.userForm.value.securityNumber,
        }
      };

      //console.log('User customUser:', customUser);

      this.userService.newUser(customUser).subscribe(
        (response) => {
          //console.log(response);
          this.matDialogRef.close('success');
        }, (error) => {}
      );







      // const userData = {
      //   ...this.user,
      //   username: this.userForm.value.username,
      //   password: this.userForm.value.password,
      //   roles: this.userForm.value.roles.join(', '), // Join selected roles into a string
      //   details: {
      //     ...this.userDetails,
      //     firstName: this.userForm.value.firstName,
      //     lastName: this.userForm.value.lastName,
      //     email: this.userForm.value.email,
      //     phone: this.userForm.value.phone,
      //     address: this.userForm.value.address,
      //     securityNumber: this.userForm.value.securityNumber,
      //   }
      // };

      // console.log('User created:', userData);
      // // Call your service to save `userData` to the database here

      
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  public closeDialog() : void {
    this.matDialogRef.close();
  }

  
}