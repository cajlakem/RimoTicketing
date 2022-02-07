import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthserviceService } from 'src/app/authservice.service';
import { RimoTicketingClientService } from 'src/app/rimo-ticketing-client.service';
import { Reporter } from 'src/app/_models/Reporter';
import { Ticket } from 'src/app/_models/Ticket';

@Component({
  selector: 'app-remove-reporter-modal',
  templateUrl: './remove-reporter-modal.component.html',
  styleUrls: ['./remove-reporter-modal.component.css']
})
export class RemoveReporterModalComponent implements OnInit {
  @Output() stateChanged = new EventEmitter<any>()
  @Input()
  forTicket: Ticket;
  selected: string[];
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
    this.contactList = this.forTicket.contacts
  }
  getErrorMessage() {
    if (this.contacts.hasError('required')) {
      return 'Kontakte auswählen';
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
      this.httpTicketingClient.removeCCReporter(this.selected, this.forTicket.id
      ).subscribe({
        next: (ticket) => this.handleCreationResponse(ticket),
        error: (error) => this.handleCreationErrorResponse(error),
      })
    }
  }

  handleCreationResponse(ticket: Ticket) {
    this.stateChanged.emit(ticket)
    $('#removeTicketContact').modal('hide')
    this.ngOnInit()
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }

}
