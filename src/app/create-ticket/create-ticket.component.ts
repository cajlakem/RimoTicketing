import { Component, Input, OnInit, Output } from '@angular/core'
import { Ticket } from '../_models/Ticket'
import { TicketComment } from '../_models/TicketComment'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { EnumList } from '../_models/EnumList'
import { Reporter } from '../_models/Reporter'
import { User } from '../_models/User'
import { RimoTicketingClientService } from '../rimo-ticketing-client.service'
import { AuthserviceService } from '../authservice.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent implements OnInit {
  public editorData = '<p>Hello, world!</p>';
  public msg: string | null

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ticketingClient: RimoTicketingClientService,
    private authService: AuthserviceService,
  ) { }

  registerForm: any = FormGroup
  submitted = false

  errorMsg: string
  retUrl: any = 'tickets'
  user: User = this.authService.getCurrentUser()
  contracts: any = this.user.getUserProfiles


  get f() {
    return this.registerForm.controls
  }

  ngOnInit(): void {
    this.errorMsg = ''
    this.registerForm = this.formBuilder.group({
      prio: ['', [Validators.required]],
      shortDsc: ['', [Validators.required]],
      longDsc: ['', [Validators.required]],
      originMIT: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    }
    if (this.submitted) {
      var myFormData = new FormData()
      myFormData.append('prio', this.registerForm.value.prio)
      myFormData.append('shortDsc', this.registerForm.value.shortDsc)
      myFormData.append('longDsc', this.registerForm.value.longDsc)
      if (this.registerForm.originMIT) {
        myFormData.append('originMIT', this.registerForm.value.originMIT)
        console.log("formfield eists");

      } else {
        myFormData.append('originMIT', (<HTMLInputElement>document.getElementById("originMIT")).innerHTML)
        console.log("works");
      }
      if (this.createTicket(myFormData) === null) {
        this.router.navigateByUrl(this.retUrl)
      } else this.errorMsg = 'Failed to create Ticket!'
    }
  }

  save() {
    this.onSubmit()
  }

  createTicket(fd: FormData): void {
    this.ticketingClient
      .createTicket(
        fd.get('longDsc') as string,
        fd.get('shortDsc') as string,
        fd.get('prio') as string,
        fd.get('originMIT') as string,
        this.user
      )
      .subscribe({
        next: (ticket) => this.handleCreationResponse(ticket),
        error: (error) => this.handleCreationErrorResponse(error),
      })
  }

  private handleCreationResponse(ticket: Ticket) {
    if (ticket) {
      this.router.navigateByUrl('/edit/' + ticket.id)
    }
  }

  private handleCreationErrorResponse(error: any) {
    console.log(error)
    this.errorMsg = 'Failed to create ticket!'
  }
}
