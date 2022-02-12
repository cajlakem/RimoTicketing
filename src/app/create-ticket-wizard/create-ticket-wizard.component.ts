import { Component, OnInit } from '@angular/core'
import { Ticket } from '../_models/Ticket'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Reporter } from '../_models/Reporter'
import { User } from '../_models/User'
import { RimoTicketingClientService } from '../rimo-ticketing-client.service'
import { AuthserviceService } from '../authservice.service'
import * as DecoupledEditorBuild from '@ckeditor/ckeditor5-build-decoupled-document';
import { MyUploadAdapter } from 'src/app/my-upload-adapter'
import { UserProfile } from '../_models/UserProfile'
import { HttpErrorResponse } from '@angular/common/http'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'


@Component({
  selector: 'app-create-ticket-wizard',
  templateUrl: './create-ticket-wizard.component.html',
  styleUrls: ['./create-ticket-wizard.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})


export class CreateTicketWizardComponent implements OnInit {
  
  invalidCredentialMsg: string;
  formGroupContract: string;
  singleOriginMIT: UserProfile;
  contacts: Reporter[]
  ckEditorInput: any;
  public Editor = DecoupledEditorBuild;
  public editorCfg = {}
  contractFormGroup: FormGroup;
  priorityFormGroup: FormGroup;
  shortDescFormGroup: FormGroup;
  nameFormGroup: FormGroup;
  phoneFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  referenceUserFormGroup: FormGroup;
  rightsFormGroup: FormGroup;
  singleContractFormGroup: FormGroup;
  hasContract: boolean;
  hasPriority: boolean;
  hasName: boolean;
  hasEmail: boolean;
  hasReferenceUser: boolean;
  hasRights: boolean;
  hasShortDesc: boolean;
  hasLongDesc: boolean;


  changeErrorCheck(formField: string) {
    switch (formField) {
      case 'contract': {
        this.hasContract = false;
        break;
      }
      case 'priority': {
        this.hasPriority = false;
        break;
      }
      case 'name': {
        this.hasName = false;
        break;
      }
      case 'email': {
        this.hasEmail = false;
        break;
      }
      case 'referenceUser': {
        this.hasReferenceUser = false;
        break;
      }
      case 'rights': {
        this.hasRights = false;
        break;
      }
      case 'shortDesc': {
        this.hasShortDesc = false;
        break;
      }
      case 'longDesc': {
        this.hasLongDesc = false;
        break;
      }
    }
  }

  isTicketCreationFailed() {
    return this.invalidCredentialMsg == null
  }

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
    this.nameFormGroup = this.formBuilder.group({
      firstNameCtrl: ['', Validators.required],
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
    this.hasContract = false
    var isSingleContract: any;
    this.contracts.length == 1 ? isSingleContract = this.contracts[0].tenant.id : isSingleContract = this.contractFormGroup.value.contractCtrl
    this.ticketingClient.queryContacts(isSingleContract).subscribe((data) => {
      this.contacts = data;
    })
  }


  onSubmit() {

    if (this.contracts.length == 1) {
      if (this.priorityFormGroup.value.priorityCtrl == 'User Request') {
        if (this.referenceUserFormGroup.value.referenceUserCtrl !== 'none') {
          if (this.singleContractFormGroup.invalid ||
            this.priorityFormGroup.invalid ||
            this.nameFormGroup.invalid ||
            this.emailFormGroup.invalid ||
            this.referenceUserFormGroup.invalid) {
            this.singleContractFormGroup.invalid ? this.hasContract = true : ""
            this.priorityFormGroup.invalid ? this.hasPriority = true : ""
            this.nameFormGroup.invalid ? this.hasName = true : ""
            this.emailFormGroup.invalid ? this.hasEmail = true : ""
            this.referenceUserFormGroup.invalid ? this.hasReferenceUser = true : ""
            this.invalidCredentialMsg = 'Bitte füllen Sie die Form vollständig aus!'
            return
          }
        } else {
          if (this.singleContractFormGroup.invalid ||
            this.priorityFormGroup.invalid ||
            this.nameFormGroup.invalid ||
            this.emailFormGroup.invalid ||
            this.rightsFormGroup.invalid) {
            this.singleContractFormGroup.invalid ? this.hasContract = true : ""
            this.priorityFormGroup.invalid ? this.hasPriority = true : ""
            this.nameFormGroup.invalid ? this.hasName = true : ""
            this.emailFormGroup.invalid ? this.hasEmail = true : ""
            this.rightsFormGroup.invalid ? this.hasRights = true : ""
            this.invalidCredentialMsg = 'Bitte füllen Sie die Form vollständig aus!'
            return
          }
        }
      } else {
        if (this.singleContractFormGroup.invalid ||
          this.priorityFormGroup.invalid ||
          this.shortDescFormGroup.invalid ||
          this.ckEditorInput == '') {
          this.singleContractFormGroup.invalid ? this.hasContract = true : ""
          this.priorityFormGroup.invalid ? this.hasPriority = true : ""
          this.shortDescFormGroup.invalid ? this.hasShortDesc = true : ""
          this.ckEditorInput = '' ? this.hasLongDesc = true : ""
          this.invalidCredentialMsg = 'Bitte füllen Sie die Form vollständig aus!'
          return
        }
      }
      if (this.priorityFormGroup.value.priorityCtrl == 'User Request') {
        var longDesc: string =
          "Vorname: " + this.nameFormGroup.value.firstNameCtrl + "\n" +
          "Nachname: " + this.nameFormGroup.value.lastNameCtrl + "\n" +
          "Telefon: " + this.phoneFormGroup.value.phoneCtrl + "\n" +
          "Referenzuser: " + this.referenceUserFormGroup.value.referenceUserCtrl + "\n" +
          "Benutzerrechte: " + this.rightsFormGroup.value.rightsCtrl
        this.ticketingClient.createTicket(
          longDesc,
          "User Request für " + this.nameFormGroup.value.firstNameCtrl + " " + this.nameFormGroup.value.lastNameCtrl,
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
          if (this.contractFormGroup.invalid ||
            this.priorityFormGroup.invalid ||
            this.nameFormGroup.invalid ||
            this.emailFormGroup.invalid ||
            this.referenceUserFormGroup.invalid) {
            this.contractFormGroup.invalid ? this.hasContract = true : ""
            this.priorityFormGroup.invalid ? this.hasPriority = true : ""
            this.nameFormGroup.invalid ? this.hasName = true : ""
            this.emailFormGroup.invalid ? this.hasEmail = true : ""
            this.referenceUserFormGroup.invalid ? this.hasReferenceUser = true : ""
            this.invalidCredentialMsg = 'Bitte füllen Sie die Form vollständig aus!'
            return
          }
        } else {
          if (this.contractFormGroup.invalid ||
            this.priorityFormGroup.invalid ||
            this.nameFormGroup.invalid ||
            this.emailFormGroup.invalid ||
            this.rightsFormGroup.invalid) {
            this.contractFormGroup.invalid ? this.hasContract = true : ""
            this.priorityFormGroup.invalid ? this.hasPriority = true : ""
            this.nameFormGroup.invalid ? this.hasName = true : ""
            this.emailFormGroup.invalid ? this.hasEmail = true : ""
            this.rightsFormGroup.invalid ? this.hasRights = true : ""
            this.invalidCredentialMsg = 'Bitte füllen Sie die Form vollständig aus!'
            return
          }
        }
      } else {
        if (this.contractFormGroup.invalid ||
          this.priorityFormGroup.invalid ||
          this.shortDescFormGroup.invalid ||
          this.ckEditorInput == '') {
          this.contractFormGroup.invalid ? this.hasContract = true : ""
          this.priorityFormGroup.invalid ? this.hasPriority = true : ""
          this.shortDescFormGroup.invalid ? this.hasShortDesc = true : ""
          this.ckEditorInput = '' ? this.hasLongDesc = true : ""
          this.invalidCredentialMsg = 'Bitte füllen Sie die Form vollständig aus!'
          return
        }
      }
      if (this.priorityFormGroup.value.priorityCtrl == 'User Request') {
        var longDesc: string =
          "Vorname: " + this.nameFormGroup.value.firstNameCtrl + "\n" +
          "Nachname: " + this.nameFormGroup.value.lastNameCtrl + "\n" +
          "Telefon: " + this.phoneFormGroup.value.phoneCtrl + "\n" +
          "Referenzuser: " + this.referenceUserFormGroup.value.referenceUserCtrl + "\n" +
          "Benutzerrechte: " + this.rightsFormGroup.value.rightsCtrl
        this.ticketingClient.createTicket(
          longDesc,
          "User Request für " + this.nameFormGroup.value.firstNameCtrl + " " + this.nameFormGroup.value.lastNameCtrl,
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
    const u = error as HttpErrorResponse
    this.invalidCredentialMsg = Object.values(u.error)[0] as string
  }
}