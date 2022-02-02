import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { LicenseServerClientService } from 'src/app/license-server-client.service';
import { RimoTicketingClientService } from 'src/app/rimo-ticketing-client.service';
import { Ticket } from 'src/app/_models/Ticket';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {
  @Output() stateChanged = new EventEmitter<any>()
  titleForm: any = FormGroup
  @Input()
  submitted = false
  errorMsg: string
  retUrl: any = 'tickets'

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthserviceService,
    private licenseService: LicenseServerClientService,
    private router: Router,
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
      (this.licenseService.changePassword(
        (<HTMLInputElement>document.getElementById("inputEmail")).value,
        (<HTMLInputElement>document.getElementById("inputPassword")).value,
        this.registerForm.value.currentPw,
        this.registerForm.value.currentPwConfirm
      ))
        .subscribe({
          next: (user) => this.handleCreationResponse(user),
          error: (error) => this.handleCreationErrorResponse(error),
        })
    }
  }

  ngOnInit(): void {
    this.invalidCredentialMsg = ''
    this.registerForm = this.formBuilder.group({
      currentPw: ['', [Validators.required]],
      currentPwConfirm: ['', [Validators.required]]
    })
  }

  async handleCreationResponse(user: User) {
    var userData = new FormData();
    userData.append('user', user.user);
    userData.append('password', (<HTMLInputElement>document.getElementById("newPwInput")).value);
    await this.authService.loginUser(userData)
    $('#changePassword').modal('hide')
    this.router.navigateByUrl(this.retUrl)
  }

  handleCreationErrorResponse(error: any) {
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }
}