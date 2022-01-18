import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { AuthserviceService } from 'src/app/authservice.service'
import { RimoTicketingClientService } from 'src/app/rimo-ticketing-client.service'
import { Reporter } from 'src/app/_models/Reporter'
import { Ticket } from 'src/app/_models/Ticket'
import { User } from 'src/app/_models/User'



@Component({
  selector: 'app-assign-reporter-modal',
  templateUrl: './assign-reporter-modal.component.html',
  styleUrls: ['./assign-reporter-modal.component.css'],
})
export class AssignReporterModalComponent implements OnInit {
  @Output() stateChanged = new EventEmitter<any>()
  createCommentForm: any = FormGroup
  @Input()
  forTicket: Ticket;
  selected: string;
  submitted: boolean = false;
  error: boolean = false
  contacts = new FormControl();
  contactList: Reporter[];
  errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthserviceService,
    private httpTicketingClient: RimoTicketingClientService,
  ) { }


  ngOnInit(): void {
    this.httpTicketingClient.queryContacts('').subscribe((data) => {
      this.contactList = data;
      console.log(data);
    });
  }
  getErrorMessage() {
    if (this.contacts.hasError('required')) {
      return 'Neue Kontakte auswählen';
    }
    return this.contacts.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    this.submitted = true;
    this.contacts.markAllAsTouched()
    if (this.contacts.invalid) {
      return
    }
    if (this.submitted) {
      for (let selectedContact of this.selected) {
        let contact = selectedContact.split(",")
        this.httpTicketingClient.addCCReporter(
          "MIT_Powerlines_SM",
          contact[0],
          contact[1],
          contact[2],
          this.forTicket.name,
          contact[3]
        ).subscribe({
          next: (ticket) => this.handleCreationResponse(ticket),
          error: (error) => this.handleCreationErrorResponse(error),
        })
      }
    }
  }

  handleCreationResponse(ticket: Ticket) {
    this.stateChanged.emit(ticket)
    $('#newTicketContact').modal('hide')
    this.ngOnInit()
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }

}
