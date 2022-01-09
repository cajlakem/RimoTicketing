import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Ticket } from '../_models/Ticket'
import { DataTableDirective } from 'angular-datatables'
import { Subject } from 'rxjs'
import { RimoTicketingClientService } from '../rimo-ticketing-client.service'
import { AuthserviceService } from '../authservice.service'
import { NgxSpinnerService } from 'ngx-spinner'

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
    private spinner: NgxSpinnerService,
  ) {}
  ticket = 'Meine'
  tickets: Ticket[]
  filterKey: string

  ngOnInit(): void {
    var lsk = localStorage.getItem('ticketFilterKey')
    lsk = lsk ? lsk : 'New'
    this.filterKey = lsk as string
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      scrollY: '60vh',
      processing: true,
      order: [[0, 'desc']],
    }
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 10000)
    this.ticketClient
      .queryOpenTickets(
        this.authService.currentUser?.getUserProfilesMITAsString as string,
        this.filterKey,
      )
      .subscribe((data) => {
        this.tickets = data
        this.rerender()
        this.spinner.hide()
      })
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next('')
    this.rerender()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()

      this.dtTrigger.next('')
    })
  }

  updateTicketList(evt: any) {
    this.filterKey = evt.target.value
    localStorage.setItem('ticketFilterKey', this.filterKey)
    this.ngOnInit()
  }

  setFilterKey(key: any) {}
}
