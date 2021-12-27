import { Component } from '@angular/core'
import { AuthserviceService } from './authservice.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Rimo Ticketing'

  constructor(
    private authService: AuthserviceService,
    private router: Router,
  ) {}

  logout() {
    this.authService.logout()
    this.router.navigate(['login'])
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }
}
