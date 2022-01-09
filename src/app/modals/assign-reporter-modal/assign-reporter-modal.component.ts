import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthserviceService } from 'src/app/authservice.service'
import { RimoTicketingClientService } from 'src/app/rimo-ticketing-client.service'
import { Ticket } from 'src/app/_models/Ticket'
import { User } from 'src/app/_models/User'

@Component({
  selector: 'app-assign-reporter-modal',
  templateUrl: './assign-reporter-modal.component.html',
  styleUrls: ['./assign-reporter-modal.component.css'],
})
export class AssignReporterModalComponent implements OnInit {
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
  ) {}

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
        .createNote(
          myFormData.get('text') as string,
          this.forTicket.name,
          user.getUserProfilesMITAsString!,
          user.christianName,
          user.lastName,
        )
        .subscribe({
          next: (ticket) => this.handleCreationResponse(ticket),
          error: (error) => this.handleCreationErrorResponse(error),
        })
      this.errorMsg = 'Failed to create Ticket!'
      console.log(myFormData.get('text'))
    }
  }

  handleCreationResponse(ticket: Ticket) {
    this.stateChanged.emit(ticket)

    $('#commentModal').modal('hide')
    this.ngOnInit()
  }

  handleCreationErrorResponse(error: any) {
    console.log(error)
  }
}
