import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { RimoTicketingClientService } from 'src/app/rimo-ticketing-client.service';
import { Reporter } from 'src/app/_models/Reporter';
import { Ticket } from 'src/app/_models/Ticket';
import { AddRemoveContactsService } from 'src/app/add-remove-contacts.service';

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
  contactFormGroup: FormGroup;
  public contactCtrl: FormControl = new FormControl();
  oldRequestorUserName: Reporter;

  constructor(
    private httpTicketingClient: RimoTicketingClientService,
    private addRemoveCCReporterService: AddRemoveContactsService
  ) { }

  config = {
    displayFn: (item: any) => { return item.christianName + " " + item.lastName; }, //to support flexible text displaying for each item
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No Contact found', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'lastName', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: true, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
    this.oldRequestorUserName = this.forTicket.requestor;
    this.addRemoveCCReporterService
      .getUpdate()
      .subscribe((message) => {
        if (message.origin == "newRequestor") {
          this.contactList = message.newTicketContacts;
        }
      })
  }

  onSubmit() {
    if (this.contactCtrl.value == "") {
      this.errorMsg = 'Neuen Requestor auswählen'
      return
    }
    this.httpTicketingClient.changeTicketRequestor(
      this.contactCtrl.value.userName,
      this.forTicket.id,
    ).subscribe({
      next: (ticket) => this.handleCreationResponse(ticket),
      error: (error) => this.handleCreationErrorResponse(error),
    })
  }

  handleCreationResponse(ticket: Ticket) {
    this.stateChanged.emit(ticket)
    this.contactList.push(this.oldRequestorUserName)
    this.addRemoveCCReporterService.sendUpdate(this.contactList.filter(r => r.userName !== ticket.requestor.userName), "newRequestor")
    $('#changeTicketRequestorlModal').modal('hide')
    this.contactCtrl.reset()
  }

  handleCreationErrorResponse(error: any) {
    this.contactCtrl.reset()
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }

}
