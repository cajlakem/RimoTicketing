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
import { RouterModule } from '@angular/router'
import { UserpofileComponent } from './userpofile/userpofile.component'
import { NotificationComponent } from './notification/notification.component'
import { HttpClientModule } from '@angular/common/http'
import { AvatarModule } from 'ngx-avatar'
import { environment } from 'src/environments/environment'
import { NgxSpinnerModule } from 'ngx-spinner'
import { DayAgoPipe } from './_helpers/day-ago-pipe'

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
    NotificationComponent,
    DayAgoPipe,
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
    HttpClientModule,
    AvatarModule,
    NgxSpinnerModule,
  ],
  providers: [AuthGuardService],

  bootstrap: [AppComponent],
})
export class AppModule {}
