import { Component, OnInit } from '@angular/core'
import { AuthserviceService } from '../authservice.service'
import { Router } from '@angular/router'
import { User } from '../_models/User'
import { TicketsComponent } from '../tickets/tickets.component'
import { Ticket } from '../_models/Ticket'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    private authService: AuthserviceService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout()
    this.router.navigate(['login'])
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

  isVisible(): boolean {
    return localStorage.getItem('currentUser') != null
  }

  getCurrentUser(): User {
    return this.authService.currentUser!
  }

  onSubmit() {
    if (this.router.url == '/tickets') {
      this.router.navigate(['login'])
    }
    this.router.navigate(['tickets'])
  }
}
