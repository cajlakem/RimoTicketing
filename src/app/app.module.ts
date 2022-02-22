import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
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
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DataTablesModule } from 'angular-datatables'
import { RouterModule } from '@angular/router'
import { UserpofileComponent } from './userpofile/userpofile.component'
import { NotificationComponent } from './notification/notification.component'
import { HttpClientModule } from '@angular/common/http'
import { AvatarModule } from 'ngx-avatar'
import { environment } from 'src/environments/environment'
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner'
import { DayAgoPipe } from './_helpers/day-ago-pipe'
import { CreateComentModalComponent } from './modals/create-coment-modal/create-coment-modal.component'
import { ReopenModalComponent } from './modals/reopen-modal/reopen-modal.component'
import { DoneModalComponent } from './modals/done-modal/done-modal.component'
import { DiscardModalComponent } from './modals/discard-modal/discard-modal.component'
import { ChangeTicketTitleModalComponent } from './modals/change-ticket-title-modal/change-ticket-title-modal.component'
import { AssignReporterModalComponent } from './modals/assign-reporter-modal/assign-reporter-modal.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule, } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { RemoveReporterModalComponent } from './modals/remove-reporter-modal/remove-reporter-modal.component';
import { NewRequestorModalComponent } from './modals/new-requestor-modal/new-requestor-modal.component';
import { ChangePasswordModalComponent } from './modals/change-password-modal/change-password-modal.component';
import { ForgotPasswordModalComponent } from './modals/forgot-password-modal/forgot-password-modal.component'
import { CreateTicketWizardComponent } from './create-ticket-wizard/create-ticket-wizard.component';
import { MatIconModule } from '@angular/material/icon';
import { SelectDropDownModule } from 'ngx-select-dropdown'


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
    CreateComentModalComponent,
    ReopenModalComponent,
    DoneModalComponent,
    DiscardModalComponent,
    ChangeTicketTitleModalComponent,
    AssignReporterModalComponent,
    RemoveReporterModalComponent,
    NewRequestorModalComponent,
    ChangePasswordModalComponent,
    ForgotPasswordModalComponent,
    CreateTicketWizardComponent,
  ],
  imports: [
    SelectDropDownModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
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
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [
    AuthGuardService
  ],

  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
