import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthserviceService } from 'src/app/authservice.service'
import { RimoTicketingClientService } from 'src/app/rimo-ticketing-client.service'
import { Ticket } from 'src/app/_models/Ticket'
import { User } from 'src/app/_models/User'

@Component({
  selector: 'app-discard-modal',
  templateUrl: './discard-modal.component.html',
  styleUrls: ['./discard-modal.component.css'],
})
export class DiscardModalComponent implements OnInit {
  @Output() stateChanged = new EventEmitter<any>()
  @Input()
  forTicket: Ticket

  errorMsg: string
  constructor(
    private httpTicketingClient: RimoTicketingClientService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.errorMsg = ''
  }

  onSubmit() {
    this.httpTicketingClient.deleteTicket(this.forTicket.name).subscribe({
      next: () => this.handleCreationResponse(),
      error: (error) => this.handleCreationErrorResponse(error),
    })
  }

  handleCreationResponse() {
    this.router.navigateByUrl('/tickets')
    $('#deleteModal').modal('hide')
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }
}
