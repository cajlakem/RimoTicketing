import { Component } from '@angular/core';
import { AuthserviceService } from './authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rimo Ticketing';

  isLoggedIn = true;

  constructor (private authService:AuthserviceService, 
    private router:Router) {
  }

  logout() {
    this.authService.loginuser;
    this.router.navigate(['login']);
  }
}
