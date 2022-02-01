import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthserviceService } from 'src/app/authservice.service'
import { RimoTicketingClientService } from 'src/app/rimo-ticketing-client.service'
import { Ticket } from 'src/app/_models/Ticket'
import { User } from 'src/app/_models/User'

@Component({
  selector: 'app-reopen-modal',
  templateUrl: './reopen-modal.component.html',
  styleUrls: ['./reopen-modal.component.css'],
})
export class ReopenModalComponent implements OnInit {
  @Output() stateChanged = new EventEmitter<any>()
  createCommentForm: any = FormGroup
  @Input()
  forTicket: Ticket
  submitted = false
  errorMsg: string
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthserviceService,
    private httpTicketingClient: RimoTicketingClientService,
  ) { }

  get f() {
    return this.createCommentForm.controls
  }

  ngOnInit(): void {
    this.errorMsg = ''
    this.createCommentForm = this.formBuilder.group({
      text: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.submitted = true

    if (this.createCommentForm.invalid) {
      return
    }
    if (this.submitted) {
      var myFormData = new FormData()
      myFormData.append('text', this.createCommentForm.value.text)
      var user: User = this.authService.getCurrentUser()
      this.httpTicketingClient
        .reOpenTicket(
          this.forTicket.name,
          myFormData.get('text') as string,
          "asd",
          user.christianName,
          user.lastName,
        )
        .subscribe({
          next: (ticket) => this.handleCreationResponse(ticket),
          error: (error) => this.handleCreationErrorResponse(error),
        })
    }
  }

  handleCreationResponse(ticket: Ticket) {
    this.stateChanged.emit(ticket)

    $('#reopenModal').modal('hide')
    this.ngOnInit()
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }
}
