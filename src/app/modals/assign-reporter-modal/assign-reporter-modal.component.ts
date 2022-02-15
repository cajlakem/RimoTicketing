import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { AddRemoveContactsService } from 'src/app/add-remove-contacts.service'
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
  contactFormGroup: FormGroup


  constructor(
    private httpTicketingClient: RimoTicketingClientService,
    private formBuilder: FormBuilder,
    private removeCCContacts: AddRemoveContactsService
  ) { }


  ngOnInit(): void {
    this.contactFormGroup = this.formBuilder.group({
      contactCtrl: ['', Validators.required],
    });
    console.log(this.contactList);

  }

  onSubmit() {
    if (this.contactFormGroup.invalid) {
      if (this.contactFormGroup.value.contactCtrl == "") {
        this.errorMsg = 'Zu entfernende Kontakte auswählen'
      }
      return
    }
    this.httpTicketingClient.addCCReporter(
      this.selected,
      this.forTicket.id,
    ).subscribe({
      next: (ticket) => this.handleCreationResponse(ticket),
      error: (error) => this.handleCreationErrorResponse(error),
    })
  }

  handleCreationResponse(ticket: Ticket) {
    this.stateChanged.emit(ticket)
    this.removeCCContacts.sendUpdate(ticket.contacts)
    $('#newTicketContact').modal('hide')
    this.ngOnInit()
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }

}
