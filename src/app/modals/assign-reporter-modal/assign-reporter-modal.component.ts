import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { MatSelect } from '@angular/material/select'
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs'
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
  public contactCtrl: FormControl = new FormControl();


  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  constructor(
    private httpTicketingClient: RimoTicketingClientService,
    private removeCCContacts: AddRemoveContactsService
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
    this.removeCCContacts
      .getUpdate()
      .subscribe((message) => {
        if (message.origin == "addCCReporters") {
          this.contactList = this.contactList.filter(c => !message.newTicketContacts.map((y: { userName: string }) => y.userName).includes(c.userName));
        } else if (message.origin == "removeCCReporters") {
          this.contactList = this.contactList.concat(message.newTicketContacts);
        }
      })
  }

  removeError(): void {
    this.errorMsg = "";
  }

  onSubmit() {
    if (this.contactCtrl.value === null) {
      this.errorMsg = 'Neue Kontakte auswählen'
      return
    }
    let newTicketContacts: string[] = [];
    for (let c of this.contactCtrl.value) {
      newTicketContacts.push(c.userName)
    }
    this.httpTicketingClient.addCCReporter(
      newTicketContacts,
      this.forTicket.id,
    ).subscribe({
      next: (ticket: Ticket) => this.handleCreationResponse(ticket),
      error: (error: any) => this.handleCreationErrorResponse(error),
    })
  }

  handleCreationResponse(ticket: Ticket) {
    this.stateChanged.emit(ticket)
    this.removeCCContacts.sendUpdate(ticket.contacts, 'addCCReporters')
    $('#newTicketContact').modal('hide')
    this.contactCtrl.reset()
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }

}
