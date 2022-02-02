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
import { GlobalSearchServiceService } from '../global-search-service.service'
import { User } from '../_models/User'

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
  subscriptionName: any
  ids: any
  user: User = this.authService.getCurrentUser()

  constructor(
    private ticketClient: RimoTicketingClientService,
    private authService: AuthserviceService,
    private spinner: NgxSpinnerService,
    private ticketTable: GlobalSearchServiceService
  ) { }
  ticket = 'Meine'
  tickets: Ticket[]
  filterKey: string
  displaySearchResuts: boolean = false;

  ngOnInit(): void {
    $('#example thead #columnSearchesye th').each(function () {
      var title = $(this).text();
      $(this).html('<input type="text" placeholder=' + title + ' />');
    });
    if ((<HTMLInputElement>document.getElementById("globalSearch")).value !== "") {
      this.ticketsAfterGlobalSearch((<HTMLInputElement>document.getElementById("globalSearch")).value)
      return
    }
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
        this.user,
        this.filterKey
      )
      .subscribe((data) => {
        this.tickets = data
        this.rerender()
        this.spinner.hide()
      })
    this.subscriptionName = this.ticketTable
      .getUpdate()
      .subscribe(() => {
        this.ngOnInit()
      })


  }


  ngAfterViewInit(): void {
    this.dtTrigger.next('')
    this.rerender()
    this.dtTrigger.subscribe(() => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.columns().every(function () {
          const that = this;
          $('input', this.header()).on('keyup change', function () {
            var valueElement = this as HTMLInputElement
            if (that.search() !== valueElement['value']) {
              that
                .search(valueElement['value'])
                .draw();
            }
          });
        });
      });
    });
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
    (<HTMLInputElement>document.getElementById("globalSearch")).value = ""
    this.displaySearchResuts = false;
    this.filterKey = evt.target.value
    localStorage.setItem('ticketFilterKey', this.filterKey)
    this.ngOnInit()
  }

  setFilterKey(key: any) { }

  async ticketsAfterGlobalSearch(searchResult: string) {
    this.displaySearchResuts = true;
    this.filterKey = "Searched"
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      scrollY: '60vh',
      processing: true,
      order: [[0, 'desc']],
      search: {
        search: searchResult
      }
    }
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 10000)
    this.ticketClient
      .queryOpenTickets(
        this.user,
        "Open"
      )
      .subscribe((data) => {
        for (let ticket of data) {
          this.tickets.push(ticket)
        }
        this.rerender()
        this.spinner.hide()
      })
  }


}
