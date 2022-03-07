import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { fromEvent, Observable, Subscription } from 'rxjs'
import { filter, distinctUntilChanged } from 'rxjs/operators'
import { BreadCrumbService } from '../bread-crumb.service'
import { RimoTicketingClientService } from '../rimo-ticketing-client.service'
import { Ticket } from '../_models/Ticket'
import * as bootstrap from 'bootstrap'
import { TicketComment } from '../_models/TicketComment'
import { tick } from '@angular/core/testing'
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component'
import { LicenseServerClientService } from '../license-server-client.service'
import { AuthserviceService } from '../authservice.service'
import { Reporter } from '../_models/Reporter'


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit, OnDestroy {
  report$: Observable<Ticket>
  navigationSubscription: any
  bcsSubscrpition: any
  subscription: Subscription
  ticket: Ticket = new Ticket()
  queryContacts: Reporter[];
  contactsWithoutRequestor: Reporter[];
  contactsWithoutTicketContacts: Reporter[];
  ticketCreationDate: Date;
  userName: string = this.authService.getCurrentUser().user

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bcs: BreadCrumbService,
    private ticketingClient: RimoTicketingClientService,
    private authService: AuthserviceService
  ) {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.initLoad()
      }
    })
  }



  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.paramMap.get('id')
    this.ticketingClient.queryTicketWithlId(id as string, this.userName).subscribe(async (data) => {
      this.ticket = Object.assign(new Ticket(), data)
      this.bcs.pasivateBreadCrumbId(this.ticket)
      this.bcs.sendUpdate(this.ticket)
      if (!this.ticket.isReadByQueryTicketReporter) {
        this.ticketingClient.setReadWithUser(
          this.userName,
          this.ticket.id,
        ).subscribe((data) => {
        }
        )
      }
      this.ticketCreationDate = new Date(Number(this.ticket.tsCreation.toString() + "000"))
      this.ticketingClient.queryContacts(this.ticket.getTicketingContract.externalID).subscribe((data) => {
        this.queryContacts = data;
        this.contactsWithoutRequestor = data.filter(contact => contact.userName !== this.ticket.requestor.userName)
        if (this.ticket.contacts.length > 0) {
          this.contactsWithoutTicketContacts = data.filter(c => !this.ticket.contacts.map((y: { userName: any }) => y.userName).includes(c.userName));
        } else {
          this.contactsWithoutTicketContacts = data
        }
      })
    })



  }

  ngOnDestroy(): void {
    // Destroy navigationSubscription to avoid memory leaks
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe()
    }
  }

  initLoad() {
    window.scrollTo(0, 0)
  }

  onStateChange(ticket: Ticket) {
    this.ngOnInit()
  }

  secondsToTime(s: number) {
    const dateObj: Date = new Date(s * 1000);

    const hours = dateObj.getUTCHours() < 10 ? '0' + dateObj.getUTCHours() : dateObj.getUTCHours()
    const minutes = dateObj.getUTCMinutes() < 10 ? '0' + dateObj.getUTCMinutes() : dateObj.getUTCMinutes()

    return hours + ":" + minutes
  }
}
