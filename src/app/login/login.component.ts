import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthserviceService } from '../authservice.service'
import { Router, ActivatedRoute } from '@angular/router'
import { User } from '../_models/User'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userauth: AuthserviceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  registerForm: any = FormGroup
  submitted = false

  invalidCredentialMsg: string
  pwdRequestedMsg: string
  retUrl: any = 'tickets'
  user: User

  isLoginFailed() {
    return this.invalidCredentialMsg == null
  }

  get f() {
    return this.registerForm.controls
  }
  async onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    }
    if (this.submitted) {
      var myFormData = new FormData()

      myFormData.append('user', this.registerForm.value.username)
      myFormData.append('password', this.registerForm.value.password)

      try {
        await this.userauth.loginUser(myFormData)
        var user: User = this.userauth.getCurrentUser()

        this.router.navigateByUrl(this.retUrl)
      } catch (error) {
        const e = error as Error
        this.invalidCredentialMsg = e.message
      }
    }
  }
  ngOnInit(): void {
    if (this.userauth.isLoggedIn()) {

      this.router.navigate([this.retUrl])
    }
    this.invalidCredentialMsg = ''
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  isLoggedIn(): boolean {
    return this.userauth.isLoggedIn()
  }

  requestNewPassword(): void {
    this.pwdRequestedMsg = 'Password has been requested. Check your emails!'
  }
}
