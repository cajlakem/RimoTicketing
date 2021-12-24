import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AuthGuardService } from './_helpers/auth.guard';

const routes : Routes = [
  //{path: 'main', component:MainComponent, canActivate : [AuthGuardService]},
  {path: 'main', component:MainComponent},
  {path: 'login', component:LoginComponent},
  {path: '', redirectTo: 'main', pathMatch: 'full'}]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
