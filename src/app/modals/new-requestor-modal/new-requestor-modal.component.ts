import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RimoTicketingClientService } from 'src/app/rimo-ticketing-client.service';
import { Reporter } from 'src/app/_models/Reporter';
import { Ticket } from 'src/app/_models/Ticket';

@Component({
  selector: 'app-new-requestor-modal',
  templateUrl: './new-requestor-modal.component.html',
  styleUrls: ['./new-requestor-modal.component.css']
})
export class NewRequestorModalComponent implements OnInit {
  @Output() stateChanged = new EventEmitter<any>()
  @Input()
  forTicket: Ticket
  selected: string;
  submitted: boolean = false;
  error: boolean = false
  contacts = new FormControl();
  @Input()
  contactList: Reporter[];
  errorMsg: string;

  constructor(
    private httpTicketingClient: RimoTicketingClientService
  ) { }

  ngAfterViewInit() {
    this.contactList.filter(contact => contact.userName !== this.forTicket.requestor.userName)
  }

  ngOnInit(): void {
    
  }

  getErrorMessage() {
    if (this.contacts.hasError('required')) {
      return 'Neuen Requestor auswählen';
    }
    return this.contacts.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    this.contactList.filter(contact => contact.userName !== this.forTicket.requestor.userName)
    this.submitted = true;
    this.contacts.markAllAsTouched()
    if (this.contacts.invalid) {
      return
    }
    if (this.submitted) {
      this.httpTicketingClient.changeTicketRequestor(
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
    $('#changeTicketRequestorlModal').modal('hide')
    this.ngOnInit()
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }

}
