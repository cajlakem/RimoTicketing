import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { RimoTicketingClientService } from 'src/app/rimo-ticketing-client.service'
import { Reporter } from 'src/app/_models/Reporter'
import { Ticket } from 'src/app/_models/Ticket'


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
  selected: string[];
  submitted: boolean = false;
  error: boolean = false
  contacts = new FormControl();
  @Input()
  contactList: Reporter[];
  errorMsg: string;


  constructor(
    private httpTicketingClient: RimoTicketingClientService
  ) { }


  ngOnInit(): void {
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
      this.httpTicketingClient.addCCReporter(
        this.selected,
        this.forTicket.id,
      ).subscribe({
        next: (ticket) => this.handleCreationResponse(ticket),
        error: (error) => this.handleCreationErrorResponse(error),
      })
    }
  }

  handleCreationResponse(ticket: Ticket) {
    this.stateChanged.emit(ticket)
    $('#newTicketContact').modal('hide')
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }

}
