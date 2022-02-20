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
  public contactFilterCtrl: FormControl = new FormControl();
  public filteredContactList: ReplaySubject<Reporter[]> = new ReplaySubject<Reporter[]>(1);
  private _onDestroy = new Subject<void>();


  constructor(
    private httpTicketingClient: RimoTicketingClientService,
    private formBuilder: FormBuilder,
  ) { }


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

  ngAfterViewInit() {

  }

  ngOnInit(): void {
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
