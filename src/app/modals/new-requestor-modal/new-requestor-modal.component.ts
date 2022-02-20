import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
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
  contactFormGroup: FormGroup;
  public contactCtrl: FormControl = new FormControl();

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
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  constructor(
    private httpTicketingClient: RimoTicketingClientService
  ) { }

  ngOnDestroy() {
  }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.contactFormGroup.invalid);

    if (this.contactFormGroup.invalid) {
      if (this.contactFormGroup.value.contactCtrl == "") {
        this.errorMsg = 'Neuen Requestor auswählen'
      }
      return
    }
    this.httpTicketingClient.changeTicketRequestor(
      this.selected,
      this.forTicket.id,
    ).subscribe({
      next: (ticket) => this.handleCreationResponse(ticket),
      error: (error) => this.handleCreationErrorResponse(error),
    })
  }

  handleCreationResponse(ticket: Ticket) {
    this.stateChanged.emit(ticket)
    $('#changeTicketRequestorlModal').modal('hide')
    this.contactList = ticket.contacts
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }

}
