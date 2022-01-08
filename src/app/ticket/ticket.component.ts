import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { fromEvent, Observable, Subscription } from 'rxjs'
import { filter, distinctUntilChanged } from 'rxjs/operators'
import { BreadCrumbService } from '../bread-crumb.service'
import { RimoTicketingClientService } from '../rimo-ticketing-client.service'
import { Ticket } from '../_models/Ticket'

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit, OnDestroy {
  report$: Observable<Ticket>
  navigationSubscription: any
  subscription: Subscription
  ticket: Ticket = new Ticket()

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bcs: BreadCrumbService,
    private ticketingClient: RimoTicketingClientService,
  ) {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.initLoad()
      }
    })
  }

  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.paramMap.get('id')
    this.ticketingClient.queryTicketWithlId(id as string).subscribe((data) => {
      this.ticket = Object.assign(new Ticket(), data)
      this.bcs.pasivateBreadCrumbId(this.ticket)
      console.log(this.ticket)
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
}
