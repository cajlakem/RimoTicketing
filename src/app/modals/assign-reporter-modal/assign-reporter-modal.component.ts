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
  contactFormGroup: FormGroup
  public contactCtrl: FormControl = new FormControl();
  public contactFilterCtrl: FormControl = new FormControl();
  public filteredContactList: ReplaySubject<Reporter[]> = new ReplaySubject<Reporter[]>(1);
  private _onDestroy = new Subject<void>();


  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  constructor(
    private httpTicketingClient: RimoTicketingClientService,
    private formBuilder: FormBuilder,
    private removeCCContacts: AddRemoveContactsService
  ) { }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  protected setInitialValue() {
    this.filteredContactList
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Reporter, b: Reporter) => a && b && a.userName === b.userName;
      });
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
