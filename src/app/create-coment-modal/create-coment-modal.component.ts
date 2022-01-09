import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthserviceService } from '../authservice.service'
import { RimoTicketingClientService } from '../rimo-ticketing-client.service'
import { Ticket } from '../_models/Ticket'
import { User } from '../_models/User'

@Component({
  selector: 'app-create-coment-modal',
  templateUrl: './create-coment-modal.component.html',
  styleUrls: ['./create-coment-modal.component.css'],
})
export class CreateComentModalComponent implements OnInit {
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
      this.errorMsg = 'Bitte Kommentar eingeben!'
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
    this.ngOnInit()
    $('#commentModal').modal('hide')
  }

  handleCreationErrorResponse(error: any) {
    console.log(error)
  }
}
