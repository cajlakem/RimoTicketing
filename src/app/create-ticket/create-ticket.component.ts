import { Component, Input, OnInit, Output, ViewChild } from '@angular/core'
import { Ticket } from '../_models/Ticket'
import { TicketComment } from '../_models/TicketComment'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { EnumList } from '../_models/EnumList'
import { Reporter } from '../_models/Reporter'
import { User } from '../_models/User'
import { RimoTicketingClientService } from '../rimo-ticketing-client.service'
import { AuthserviceService } from '../authservice.service'
import * as DecoupledEditorBuild from '@ckeditor/ckeditor5-build-decoupled-document';
import { MyUploadAdapter } from 'src/app/my-upload-adapter'
import { UserProfile } from '../_models/UserProfile'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CreateTicketComponent implements OnInit {
  formGroupContract: string;
  singleOriginMIT: UserProfile;
  contacts: Reporter[]
  ckEditorInput: any;
  public Editor = DecoupledEditorBuild;
  public editorCfg = {}
  contractFormGroup: FormGroup;
  priorityFormGroup: FormGroup;
  shortDescFormGroup: FormGroup;
  firstNameFormGroup: FormGroup;
  lastNameFormGroup: FormGroup;
  phoneFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  referenceUserFormGroup: FormGroup;
  rightsFormGroup: FormGroup;
  singleContractFormGroup: FormGroup;

  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new MyUploadAdapter(loader);
    };
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ticketingClient: RimoTicketingClientService,
    private authService: AuthserviceService,
  ) { 
    this.contracts.length == 1 ? this.formGroupContract = "singleContractFormGroup" : this.formGroupContract = "contractFormGroup"
  }

  errorMsg: string
  retUrl: any = 'tickets'
  user: User = this.authService.getCurrentUser()
  contracts: UserProfile[] = this.user.getUserProfiles

  ngOnInit(): void {
    this.contractFormGroup = this.formBuilder.group({    
      contractCtrl: ['', Validators.required],
    });
    this.priorityFormGroup = this.formBuilder.group({
      priorityCtrl: ['', Validators.required],
    });
    this.shortDescFormGroup = this.formBuilder.group({
      shortDescCtrl: ['', Validators.required],
    });
    this.firstNameFormGroup = this.formBuilder.group({
      firstNameCtrl: ['', Validators.required],
    });
    this.lastNameFormGroup = this.formBuilder.group({
      lastNameCtrl: ['', Validators.required],
    });
    this.emailFormGroup = this.formBuilder.group({
      emailCtrl: ['', Validators.required],
    });
    this.referenceUserFormGroup = this.formBuilder.group({
      referenceUserCtrl: ['', Validators.required],
    });
    this.rightsFormGroup = this.formBuilder.group({
      rightsCtrl: ['', Validators.required],
    });
    this.singleContractFormGroup = this.formBuilder.group({
      singleCtrl: [this.contracts[0].tenant.nameToDisplay, Validators.required],
    });
    this.phoneFormGroup = this.formBuilder.group({
      phoneCtrl: [],
    });
  }

  ngAfterViewInit() {
    this.getContactsFromCurrentContract()
  }

  getContactsFromCurrentContract() {
    var isSingleContract: any;
    this.contracts.length == 1 ? isSingleContract = this.contracts[0].tenant.id : isSingleContract = this.contractFormGroup.value.contractCtrl
    this.ticketingClient.queryContacts(isSingleContract).subscribe((data) => {
      this.contacts = data;
    })
  }

  onSubmit() { 
    if (this.contracts.length == 1){
      if (this.priorityFormGroup.value.priorityCtrl == 'User Request') {
        if (this.referenceUserFormGroup.value.referenceUserCtrl !== 'none') {
        if (this.singleContractFormGroup.invalid ||
          this.priorityFormGroup.invalid ||
          this.firstNameFormGroup.invalid ||
          this.lastNameFormGroup.invalid ||
          this.emailFormGroup.invalid ||
          this.referenceUserFormGroup.invalid) {
            console.log("first");      
          return
        }
      } else {
        if (this.singleContractFormGroup.invalid ||
          this.priorityFormGroup.invalid ||
          this.firstNameFormGroup.invalid ||
          this.lastNameFormGroup.invalid ||
          this.emailFormGroup.invalid ||
          this.rightsFormGroup.invalid) {
            console.log("second");
          return
        }
      }
      } else {
        if (this.singleContractFormGroup.invalid ||
          this.priorityFormGroup.invalid ||
          this.shortDescFormGroup.invalid ||
          this.ckEditorInput == '') {
          return
        }
      }
      if (this.priorityFormGroup.value.priorityCtrl == 'User Request') {
        var longDesc: string =
          "Vorname: " + this.firstNameFormGroup.value.firstNameCtrl + "\n" +
          "Nachname: " + this.lastNameFormGroup.value.lastNameCtrl + "\n" +
          "Telefon: " + this.phoneFormGroup.value.phoneCtrl + "\n" +
          "Referenzuser: " + this.referenceUserFormGroup.value.referenceUserCtrl + "\n" +
          "Benutzerrechte: " + this.rightsFormGroup.value.rightsCtrl
        this.ticketingClient.createTicket(
          longDesc,
          "User Request für " + this.firstNameFormGroup.value.firstNameCtrl + " " + this.lastNameFormGroup.value.lastNameCtrl,
          this.priorityFormGroup.value.priorityCtrl,
          this.contracts[0].tenant.id,
          this.user
        ).
          subscribe({
            next: (ticket: any) => this.handleCreationResponse(ticket),
            error: (error: any) => this.handleCreationErrorResponse(error)
          })
      } else {
        this.ticketingClient.createTicket(
          this.ckEditorInput,
          this.shortDescFormGroup.value.shortDescCtrl,
          this.priorityFormGroup.value.priorityCtrl,
          this.contracts[0].tenant.id,
          this.user
        ).
          subscribe({
            next: (ticket: any) => this.handleCreationResponse(ticket),
            error: (error: any) => this.handleCreationErrorResponse(error)
          })
      }
    } else {
      if (this.priorityFormGroup.value.priorityCtrl == 'User Request') {
        if (this.referenceUserFormGroup.value.referenceUserCtrl !== 'none') {
          if (this.singleContractFormGroup.invalid ||
            this.priorityFormGroup.invalid ||
            this.firstNameFormGroup.invalid ||
            this.lastNameFormGroup.invalid ||
            this.emailFormGroup.invalid ||
            this.referenceUserFormGroup.invalid) {
            return
          }
        } else {
          if (this.singleContractFormGroup.invalid ||
            this.priorityFormGroup.invalid ||
            this.firstNameFormGroup.invalid ||
            this.lastNameFormGroup.invalid ||
            this.emailFormGroup.invalid ||
            this.rightsFormGroup.invalid) {
            return
          }
        }
      } else {
        if (this.contractFormGroup.invalid ||
          this.priorityFormGroup.invalid ||
          this.shortDescFormGroup.invalid ||
          this.ckEditorInput == '') {
          return
        }
      }
      if (this.priorityFormGroup.value.priorityCtrl == 'User Request') {
        var longDesc: string =
          "Vorname: " + this.firstNameFormGroup.value.firstNameCtrl + "\n" +
          "Nachname: " + this.lastNameFormGroup.value.lastNameCtrl + "\n" +
          "Telefon: " + this.phoneFormGroup.value.phoneCtrl + "\n" +
          "Referenzuser: " + this.referenceUserFormGroup.value.referenceUserCtrl + "\n" +
          "Benutzerrechte: " + this.rightsFormGroup.value.rightsCtrl
        this.ticketingClient.createTicket(
          longDesc,
          "User Request für " + this.firstNameFormGroup.value.firstNameCtrl + " " + this.lastNameFormGroup.value.lastNameCtrl,
          this.priorityFormGroup.value.priorityCtrl,
          this.contractFormGroup.value.contractCtrl,
          this.user
        ).
          subscribe({
            next: (ticket: any) => this.handleCreationResponse(ticket),
            error: (error: any) => this.handleCreationErrorResponse(error)
          })
      } else {
        this.ticketingClient.createTicket(
          this.ckEditorInput,
          this.shortDescFormGroup.value.shortDescCtrl,
          this.priorityFormGroup.value.priorityCtrl,
          this.contractFormGroup.value.contractCtrl,
          this.user
        ).
          subscribe({
            next: (ticket: any) => this.handleCreationResponse(ticket),
            error: (error: any) => this.handleCreationErrorResponse(error)
          })
      }
    }
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
