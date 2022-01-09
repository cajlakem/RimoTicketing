import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthserviceService } from 'src/app/authservice.service'
import { RimoTicketingClientService } from 'src/app/rimo-ticketing-client.service'
import { Ticket } from 'src/app/_models/Ticket'
import { User } from 'src/app/_models/User'

@Component({
  selector: 'app-change-ticket-title-modal',
  templateUrl: './change-ticket-title-modal.component.html',
  styleUrls: ['./change-ticket-title-modal.component.css'],
})
export class ChangeTicketTitleModalComponent implements OnInit {
  @Output() stateChanged = new EventEmitter<any>()
  titleForm: any = FormGroup
  @Input()
  forTicket: Ticket
  submitted = false
  errorMsg: string
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthserviceService,
    private httpTicketingClient: RimoTicketingClientService,
  ) {}

  registerForm: any = FormGroup

  invalidCredentialMsg: string
  pwdRequestedMsg: string

  get f() {
    return this.registerForm.controls
  }

  async onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    }
    if (this.submitted) {
      this.httpTicketingClient
        .changeTicketTitle(
          this.forTicket.name,
          this.registerForm.value.username,
        )
        .subscribe({
          next: (ticket) => this.handleCreationResponse(ticket),
          error: (error) => this.handleCreationErrorResponse(error),
        })
    }
  }

  ngOnInit(): void {
    this.invalidCredentialMsg = ''
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
    })
  }

  handleCreationResponse(ticket: Ticket) {
    this.stateChanged.emit(ticket)

    this.ngOnInit()
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }
}
