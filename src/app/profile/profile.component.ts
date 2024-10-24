// import { Component, OnInit } from '@angular/core';
// import { FormGroup, Validators, FormControl } from '@angular/forms';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.scss'
// })
// export class ProfileComponent implements OnInit {

//   userForm: FormGroup;

//   // User object with initial values
//   user = {
//     // account Information 
//     username: "sameer",
//     password: "sameer",
//     roles: "ADMIN",
//     isAccountNonExpired: true,
//     isAccountNonLocked: true,
//     isCredentialsNonExpired: true,
//     isEnabled: true,

//     //personal information 
//     firstName: "Sameer",
//     middleName: "",
//     lastName: "Sheik",
//     email: "sameer@gmail.com",
//     phone: "8790761948",
//     address: "Sample Address",
//     securityNumber: ""
//   };

//   constructor() {
//     // Initialize the form with user values
//     this.userForm = new FormGroup({
//       user: new FormGroup({

//         username: new FormControl(this.user.username, Validators.required),
//         password: new FormControl(this.user.password, Validators.required),
//         roles: new FormControl(this.user.roles, Validators.required),
//         isAccountNonExpired: new FormControl(this.user.isAccountNonExpired, Validators.required),
//         isAccountNonLocked: new FormControl(this.user.isAccountNonLocked, Validators.required),
//         isCredentialsNonExpired: new FormControl(this.user.isCredentialsNonExpired, Validators.required),
//         isEnabled: new FormControl(this.user.isEnabled, Validators.required),

//         firstName: new FormControl(this.user.firstName, Validators.required),
//         middleName: new FormControl(this.user.middleName), // Optional field
//         lastName: new FormControl(this.user.lastName, Validators.required),
//         email: new FormControl(this.user.email, [Validators.required, Validators.email]),
//         phone: new FormControl(this.user.phone, Validators.required),
//         address: new FormControl(this.user.address, Validators.required),
//         securityNumber: new FormControl(this.user.securityNumber, Validators.required),
//       })
//     });
//     console.log(this.userForm);
//   }

//   ngOnInit(): void {
//     // Any additional initialization can be done here
//   }

//   onSubmit(): void {
//     if (this.userForm.valid) {
//       console.log("Updated User Info: ", this.userForm.value);
//       // Call a service to update the user info in the database
//     }
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any = {
    // account Information 
    username: "sameer",
    password: "sameer",
    roles: "ADMIN",
    isAccountNonExpired: true,
    isAccountNonLocked: true,
    isCredentialsNonExpired: true,
    isEnabled: true,

    // personal information 
    firstName: "Sameer",
    middleName: "",
    lastName: "Sheik",
    email: "sameer@gmail.com",
    phone: "8790761948",
    address: "Sample Address",
    securityNumber: ""
  };

  personalInfoForm: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.personalInfoForm = this.fb.group({
      firstName: [this.user.firstName],
      middleName: [this.user.middleName],
      lastName: [this.user.lastName],
      email: [this.user.email],
      phone: [this.user.phone],
      address: [this.user.address],
      securityNumber: [this.user.securityNumber]
    });
  }

  ngOnInit(): void {}

  save() {
    console.log(this.personalInfoForm.value);
  }

  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '300px',
      data: { username: this.user.username }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle password change logic here
        console.log('Password changed:', result);
      }
    });
  }
}