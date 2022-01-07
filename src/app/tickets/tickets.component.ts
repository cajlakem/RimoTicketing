import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Ticket } from '../_models/Ticket'
import { Tickets } from '../_models/Tickets'
import { DataTableDirective } from 'angular-datatables'
import { Subject } from 'rxjs'
import { RimoTicketingClientService } from '../rimo-ticketing-client.service'
import { AuthserviceService } from '../authservice.service'

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective

  dtOptions: DataTables.Settings = {}

  dtTrigger: Subject<any> = new Subject()

  constructor(
    private ticketClient: RimoTicketingClientService,
    private authService: AuthserviceService,
  ) {}
  ticket = 'Meine Tickets'
  tickets: Ticket[]
  filterKey: string = 'Pending'

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    }

    this.ticketClient
      .queryOpenTickets(
        this.authService.currentUser?.getUserProfilesMITAsString as string,
        this.filterKey,
      )
      .subscribe((data) => {
        this.tickets = data
        this.rerender()
      })
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next('')
    this.rerender()
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe()
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy()
      // Call the dtTrigger to rerender again
      this.dtTrigger.next('')
    })
  }

  updateTicketList(evt: any) {
    this.filterKey = evt.target.value
    this.ngOnInit()
  }
}
