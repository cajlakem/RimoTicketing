import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/authservice.service';
import { RimoTicketingClientService } from 'src/app/rimo-ticketing-client.service';
import { Ticket } from 'src/app/_models/Ticket';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css']
})
export class ForgotPasswordModalComponent implements OnInit {
  @Output() stateChanged = new EventEmitter<any>()
  titleForm: any = FormGroup
  @Input()
  submitted = false
  errorMsg: string
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthserviceService,
    private httpTicketingClient: RimoTicketingClientService,
  ) { }

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
        .lostPassword(
          this.registerForm.value.username,
          this.registerForm.value.email,
        )
        .subscribe({
          next: () => this.handleCreationResponse(),
          error: (error) => this.handleCreationErrorResponse(error),
        })
    }
  }

  ngOnInit(): void {
    this.invalidCredentialMsg = ''
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
    })
  }

  handleCreationResponse() {

  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }
}
