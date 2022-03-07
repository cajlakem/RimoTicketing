import { Component, Input, OnInit, Output } from '@angular/core'
import { Ticket } from '../_models/Ticket'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UserProfile } from '../_models/UserProfile'
import { User } from '../_models/User'
import { RimoTicketingClientService } from '../rimo-ticketing-client.service'
import { AuthserviceService } from '../authservice.service'
import * as DecoupledEditorBuild from '@ckeditor/ckeditor5-build-decoupled-document';
import { MyUploadAdapter } from '../my-upload-adapter'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent implements OnInit {
  public Editor = DecoupledEditorBuild;
  public editorCfg = {}
  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new MyUploadAdapter(loader);
    };
  }
  public msg: string | null

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ticketingClient: RimoTicketingClientService,
    private authService: AuthserviceService,
  ) {
    this.registerForm = this.formBuilder.group({});
  }

  registerForm: any = FormGroup
  submitted = false
  errorMsg: string
  retUrl: any = 'tickets'
  user: User = this.authService.getCurrentUser()
  singleContract: string;
  contracts: UserProfile[] = this.user.getTicketingUserProfiles;
  renderView: Boolean = true;

  get f() {
    return this.registerForm.controls
  }

  ngOnInit(): void {
    if (this.contracts) {
      if (this.contracts.length == 1) {
        this.singleContract = this.contracts[0].tenant.nameToDisplay
      }

      this.errorMsg = ''
      this.registerForm = this.formBuilder.group({
        prio: ['', [Validators.required]],
        shortDsc: ['', [Validators.required]],
        longDsc: ['', [Validators.required]],
        originMIT: ['', [Validators.required]],
        singleOriginMIT: [this.singleContract, [Validators.required]]
      })

      if (this.contracts.length == 1) {
        this.registerForm.removeControl('originMIT')
      } else {
        this.registerForm.removeControl('singleOriginMIT')
      }
    } else {
      this.renderView = false;
    }

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

      if (this.registerForm.value.originMIT) {
        myFormData.append('originMIT', this.registerForm.value.originMIT)
      } else {
        myFormData.append('originMIT', this.registerForm.value.singleOriginMIT)
      }

      if (this.createTicket(myFormData) === null) {
        this.router.navigateByUrl(this.retUrl)
      }
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
    const u = error as HttpErrorResponse
    this.errorMsg = Object.values(u.error)[0] as string
  }
}