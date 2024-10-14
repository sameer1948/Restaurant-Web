import { Component } from '@angular/core';
import { LoginRequest } from '../model/LoginRequest';
import { AuthenicationService } from '../services/authenication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../common/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  showPassword: boolean = false; // Manage password visibility

  loginForm : FormGroup = new FormGroup({ 
    request: new FormGroup({ 
      username : new FormControl('', Validators.required),       
      password : new FormControl('', Validators.required),       
    }) 
  });

  constructor(private _authenticationService : AuthenicationService,
    private notificationService : NotificationService) {

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
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("role", data.role);
          this.notificationService.successMessage(data.message);
          this.loginForm.reset();
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
