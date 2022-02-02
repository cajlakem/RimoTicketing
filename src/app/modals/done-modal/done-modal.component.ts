import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthserviceService } from 'src/app/authservice.service'
import { RimoTicketingClientService } from 'src/app/rimo-ticketing-client.service'
import { Ticket } from 'src/app/_models/Ticket'
import { User } from 'src/app/_models/User'

@Component({
  selector: 'app-done-modal',
  templateUrl: './done-modal.component.html',
  styleUrls: ['./done-modal.component.css'],
})
export class DoneModalComponent implements OnInit {
  @Output() stateChanged = new EventEmitter<any>()
  @Input()
  forTicket: Ticket
  errorMsg: string
  constructor(private httpTicketingClient: RimoTicketingClientService,
    private authService: AuthserviceService) { }

  ngOnInit(): void {
    this.errorMsg = ''
  }

  onSubmit() {
    this.httpTicketingClient.closeTicket(this.authService.getCurrentUser().user, this.forTicket.name).subscribe({
      next: (ticket) => this.handleCreationResponse(ticket),
      error: (error) => this.handleCreationErrorResponse(error),
    })
  }

  handleCreationResponse(ticket: Ticket) {
    this.stateChanged.emit(ticket)

    $('#doneModal').modal('hide')
    this.ngOnInit()
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }
}
