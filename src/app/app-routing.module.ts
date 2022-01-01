import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { MainComponent } from './main/main.component'
import { TicketsComponent } from './tickets/tickets.component'
import { AuthGuardService } from './_helpers/auth.guard'
import { CreateTicketComponent } from './create-ticket/create-ticket.component'
import { TicketComponent } from './ticket/ticket.component'
import { UserpofileComponent } from './userpofile/userpofile.component'

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  {
    path: 'createTicket',
    component: CreateTicketComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'userProfile',
    component: UserpofileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit/:id',
    component: TicketComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
