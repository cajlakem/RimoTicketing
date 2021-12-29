import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { Observable } from 'rxjs'
import { BreadCrumbService } from '../bread-crumb.service'
import { Ticket } from '../_models/Ticket'
import { Tickets } from '../_models/Tickets'

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit, OnDestroy {
  report$: Observable<Ticket>
  navigationSubscription: any
  ticket: Ticket

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bcs: BreadCrumbService,
  ) {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.initLoad()
      }
    })
  }

  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.paramMap.get('id')
    var myTicket = Tickets.find((ticket) => ticket.id == id)!
    this.ticket = myTicket
    this.bcs.pasivateBreadCrumbId(this.ticket)
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
