import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component'
import { AppRoutingModule } from './app-routing.module'
import { TicketsComponent } from './tickets/tickets.component'
import { MainComponent } from './main/main.component'
import { AuthGuardService } from './_helpers/auth.guard'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component'
import { TicketComponent } from './ticket/ticket.component'
import { FooterComponent } from './footer/footer.component'
import { CreateTicketComponent } from './create-ticket/create-ticket.component'
import { FormsModule } from '@angular/forms'
import { CKEditorModule } from 'ckeditor4-angular'
import { DataTablesModule } from 'angular-datatables'
import { RouterModule } from '@angular/router';
import { UserpofileComponent } from './userpofile/userpofile.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TicketsComponent,
    MainComponent,
    BreadcrumbComponent,
    TicketComponent,
    FooterComponent,
    CreateTicketComponent,
    UserpofileComponent,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CKEditorModule,
    RouterModule,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
