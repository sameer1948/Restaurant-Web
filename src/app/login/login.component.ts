import { Component } from '@angular/core';
import { LoginRequest } from '../model/LoginRequest';
import { AuthenicationService } from '../services/authenication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../common/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  private readonly ADMIN_ROLE : string = 'ADMIN';
  
  private readonly USER_HOME: string = '/home';
  private readonly ADMIN_HOME : string = '/ad-home' ;



  showPassword: boolean = false; // Manage password visibility

  loginForm : FormGroup = new FormGroup({ 
    request: new FormGroup({ 
      username : new FormControl('', Validators.required),       
      password : new FormControl('', Validators.required),       
    }) 
  });

  constructor(private _authenticationService : AuthenicationService,
    private notificationService : NotificationService, private router : Router) {

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  protected login() {
    let loginRequest = new LoginRequest();
    loginRequest.username = this.loginForm.value.request?.username;
    loginRequest.key = this.loginForm.value.request?.password;

    console.log(loginRequest);

    this._authenticationService.authenticate(loginRequest).subscribe(
      data => { 
        console.log(data);
        if (data.statusCode === 202) {          
          this.notificationService.successMessage(data.message);         
          this.loginForm.reset();                    
          if (data.role.includes(this.ADMIN_ROLE)) {
            this.router.navigate([this._authenticationService.redirectUrl || this.ADMIN_HOME]);
          } else {
            this.router.navigate([this._authenticationService.redirectUrl || this.USER_HOME]);
          }
        } else if (data.statusCode === 500) {
          this.notificationService.errorMessage(data.message);
        }      

      }, error => {
        console.log(error)
        this.notificationService.errorMessage("Something Went Wrong while Login...!");
      });
  }

  protected cancel() {
    this.loginForm.reset();
  }
}
