import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core'
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
  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    if (ev.key == "Escape") {
      this.bcs.removeBreadCrumbId(this.ticket)
      this.bcs.sendUpdate(this.ticket)
      this.router.navigateByUrl('/tickets')
    }
    // do something meaningful with it
    console.log(`The user just pressed ${ev.key}!`);
  }
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
  width: number

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
    this.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
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
      console.log(this.ticket);

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

  replaceAllAscii(str: String) {
    var a = str.split('Ã¤').join("ä");
    var b = a.split('Ã¼').join("ö");
    var c = b.split('Ã¶').join("ü");
    var d = c.split('Ã\x84').join("Ä");
    var e = d.split('Ã\x96').join("Ö");
    var f = e.split('Ã\x9C').join("Ü");
    return f;
  }

  secondsToTime(s: number) {
    const dateObj: Date = new Date(s * 1000);

    const hours = dateObj.getUTCHours() < 10 ? '0' + dateObj.getUTCHours() : dateObj.getUTCHours()
    const minutes = dateObj.getUTCMinutes() < 10 ? '0' + dateObj.getUTCMinutes() : dateObj.getUTCMinutes()

    return hours + ":" + minutes
  }
}
