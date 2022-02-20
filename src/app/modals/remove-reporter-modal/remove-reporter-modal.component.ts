import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { AddRemoveContactsService } from 'src/app/add-remove-contacts.service';
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
  contactList: Reporter[];
  errorMsg: string;
  contactFormGroup: FormGroup;
  public contactCtrl: FormControl = new FormControl();
  public contactFilterCtrl: FormControl = new FormControl();
  public filteredContactList: ReplaySubject<Reporter[]> = new ReplaySubject<Reporter[]>(1);
  private _onDestroy = new Subject<void>();


  constructor(
    private formBuilder: FormBuilder,
    private httpTicketingClient: RimoTicketingClientService,
    private addedTicketContact: AddRemoveContactsService
  ) {
    this.addedTicketContact
      .getUpdate()
      .subscribe((newTicketContacts => {
        this.contactList = newTicketContacts.newTicketContacts
      }))
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private filterContacts() {
    if (!this.contactList) {
      return;
    }
    let search = this.contactFilterCtrl.value;
    if (!search) {
      this.filteredContactList.next(this.contactList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredContactList.next(
      this.contactList.filter(bank => bank.lastName.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnInit(): void {
    this.contactList = this.forTicket.contacts
    this.filteredContactList.next(this.contactList.slice());
    this.contactFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterContacts();
      });
  }

  onSubmit() {
    if (this.contactFormGroup.invalid) {
      if (this.contactFormGroup.value.contactCtrl == "") {
        this.errorMsg = 'Zu entfernende Kontakte auswählen'
      }
      return
    }
    this.httpTicketingClient.removeCCReporter(this.selected, this.forTicket.id
    ).subscribe({
      next: (ticket) => this.handleCreationResponse(ticket),
      error: (error) => this.handleCreationErrorResponse(error),
    })
  }

  handleCreationResponse(ticket: Ticket) {
    this.stateChanged.emit(ticket)
    $('#removeTicketContact').modal('hide')
    this.contactList = ticket.contacts
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    console.log(u);
    this.errorMsg = Object.values(u.error)[0] as string
  }
}
