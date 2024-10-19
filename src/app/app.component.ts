import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'restaurant-web';
  
  isAuthenticated : boolean = false; 

  constructor() {}

  ngOnInit(): void {
    
    /* if (sessionStorage.getItem("token") != null) {
      this.isAuthenticated = true;
    } */
  }
 
  protected logout() {
    
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    this.isAuthenticated  = false; 
  }

}
