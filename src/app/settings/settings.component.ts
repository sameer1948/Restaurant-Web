import { Component } from '@angular/core';
import { AuthenicationService } from '../services/authenication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  data : any;
  role : any;
  token : any;

  constructor(private _authenticationService : AuthenicationService,) { }

  getData() {
    this._authenticationService.getItem().subscribe(
      (response) => {
        this.data = response;
      }
    );

    this.role = this._authenticationService.getUserRole();

    this.token = this._authenticationService.getRefreshToken();
  }

}
