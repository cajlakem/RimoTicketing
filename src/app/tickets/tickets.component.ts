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
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective
  errorMsg: any
  dtOptions: any = {}
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
  tickets: Ticket[] = [];
  filterKey: string
  displaySearchResuts: boolean = false;

  ngOnInit() {
    $("#example").on('column-sizing.dt', function (e, settings) {
      $(".dataTables_scrollHeadInner").css("width", "100%");
    });
    $('#example thead #columnSearches th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" placeholder="Search ' + title + '" />');
      $('input', this).on('keyup change clear', function () {
        var that = this as HTMLInputElement
        if ($("#example").DataTable().column(i).search() !== that.value) {
          $("#example").DataTable().column(i).search(that.value).draw();
        }
      });
    });
    if ((<HTMLInputElement>document.getElementById("globalSearch")).value !== "") {
      this.ticketsAfterGlobalSearch((<HTMLInputElement>document.getElementById("globalSearch")).value)
    } else {
      this.drawTicketTable()
    }
    this.subscriptionName = this.ticketTable
      .getUpdate()
      .subscribe(() => {
        this.rerender()
        if ((<HTMLInputElement>document.getElementById("globalSearch")).value !== "") {
          this.ticketsAfterGlobalSearch((<HTMLInputElement>document.getElementById("globalSearch")).value)
        }
      })
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next('')
    this.rerender()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
    this.subscriptionName.unsubscribe()
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
    })
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.dtTrigger.next('')
    })
  }

  redraw(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear().draw()
    })
  }

  updateTicketList(evt: any) {
    (<HTMLInputElement>document.getElementById("globalSearch")).value = ""
    this.displaySearchResuts = false;
    this.filterKey = evt.target.value
    localStorage.setItem('ticketFilterKey', this.filterKey)
    this.drawTicketTable()
    this.redraw();
  }

  stopPropagation(evt: any) {
    if (evt.stopPropagation !== undefined) {
      evt.preventDefault();
      evt.stopPropagation();
    } else {
      evt.cancelBubble = true;
    }
  }

  drawTicketTable() {
    var lsk = localStorage.getItem('ticketFilterKey')
    lsk = lsk ? lsk : 'New'
    this.filterKey = lsk as string
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      scrollY: '60vh',
      processing: true,
      order: [[0, 'desc']],
      orderCellsTop: true,
      fixedColumns: true,
      fixedHeader: true,
      scrollX: true
    }
    this.spinner.show()
    this.ticketClient
      .queryTickets(
        this.user,
        this.filterKey
      )
      .subscribe({
        next: (data) => this.handleCreationResponse(data),
        error: (error) => this.handleCreationErrorResponse(error),
      })
  }

  ticketsAfterGlobalSearch(searchResult: string) {
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
      },
      orderCellsTop: true,
      fixedColumns: true,
      fixedHeader: true,
      scrollX: true
    }
    this.spinner.show()
    this.ticketClient
      .queryAllTickets(
        this.user
      )
      .subscribe({
        next: (data) => this.handleCreationResponse(data),
        error: (error) => this.handleCreationErrorResponse(error),
      })
  }

  handleCreationResponse(data: any) {
    this.spinner.hide()
    for (let ticket of data) {
      this.tickets.push(ticket)
    }
    this.rerender()
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
    this.spinner.hide()
  }

}
