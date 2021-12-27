import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { MainComponent } from './main/main.component'
import { TicketsComponent } from './tickets/tickets.component'
import { AuthGuardService } from './_helpers/auth.guard'
import { CreateTicketComponent } from './create-ticket/create-ticket.component'
import { TicketComponent } from './ticket/ticket.component'

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createTicket', component: CreateTicketComponent },
  {
    path: 'tickets',
    component: TicketsComponent,
    runGuardsAndResolvers: 'always',
  },
  { path: 'edit/:id', component: TicketComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
