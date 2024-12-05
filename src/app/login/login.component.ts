import { Component } from '@angular/core';
import { LoginRequest } from '../model/LoginRequest';
import { MatDialog } from '@angular/material/dialog';
import { AuthenicationService } from '../services/authenication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotificationService } from '../common/notification.service';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../common/error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly ADMIN_ROLE: string = 'ADMIN';

  showPassword: boolean = false; // Manage password visibility
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _authenticationService: AuthenicationService,
    private notificationService: NotificationService,
    private router: Router, private dialog: MatDialog) {
    
      this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (this._authenticationService.isAuthenticated()) { // checking user is already loggedin  or not ?
      this.router.navigate([this._authenticationService.redirectUrl || '']);
    }

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  protected login() {
    const { username, password } = this.loginForm.value;
    const loginRequest = { username, key: password };    

    this._authenticationService.authenticate(loginRequest).subscribe(
      data => {
        console.log(data);
        if (data.statusCode === 202) {
          this.notificationService.successMessage(data.message);
          this.loginForm.reset();
          if (data.role.includes(this.ADMIN_ROLE)) {
            this.router.navigate([this._authenticationService.redirectUrl || '']);
          } else {
            this.router.navigate([this._authenticationService.redirectUrl || '']);
          }
        } else if (data.statusCode === 500) {
          const input = {
            title : `Error `,
            message : `${data.message}.`,
            action : 'close'
          }
          this.dialog.open(ErrorDialogComponent, 
            {
              data: input,
              width: '400px',  
              maxHeight: '80vh', 
            });
        }

      }, error => {
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

  protected cancel() {
    this.loginForm.reset();
  }
}
