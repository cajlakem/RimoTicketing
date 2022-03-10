import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthserviceService } from 'src/app/authservice.service'
import { RimoTicketingClientService } from 'src/app/rimo-ticketing-client.service'
import { Ticket } from 'src/app/_models/Ticket'
import { User } from 'src/app/_models/User'
import * as DecoupledEditorBuild from '@ckeditor/ckeditor5-build-decoupled-document';
import { MyUploadAdapter } from 'src/app/my-upload-adapter'

@Component({
  selector: 'app-create-coment-modal',
  templateUrl: './create-coment-modal.component.html',
  styleUrls: ['./create-coment-modal.component.css'],
})
export class CreateComentModalComponent implements OnInit {
  public Editor = DecoupledEditorBuild;
  public editorCfg = {
    image: {
      insert: {
        type: 'inline'
      },
      toolbar: [
      ]

    }
  }
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

  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new MyUploadAdapter(loader);
    };
  }

  removeError(): void {
    this.errorMsg = ''
  }

  ngOnInit(): void {
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
          this.forTicket.id,
          user.user
        )
        .subscribe({
          next: (ticket) => this.handleCreationResponse(ticket),
          error: (error) => this.handleCreationErrorResponse(error),
        })
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
