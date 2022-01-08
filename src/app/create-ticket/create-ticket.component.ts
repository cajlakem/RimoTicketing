import { Component, OnInit } from '@angular/core'
import { Ticket } from '../_models/Ticket'
import { CKEditorModule } from 'ckeditor4-angular'
import { Tickets } from '../_models/Tickets'
import { TicketComment } from '../_models/TicketComment'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { EnumList } from '../_models/EnumList'
import { Reporter } from '../_models/Reporter'
import { User } from '../_models/User'

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent implements OnInit {
  public editor = CKEditorModule

  public model = {
    editorData: '',
  }

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  registerForm: any = FormGroup
  submitted = false

  errorMsg: string
  retUrl: any = 'tickets'

  public ticket: Ticket = {
    id: '1245',
    name: 'ID12565',
    assignedTo: new User(),
    state: new EnumList(),
    type: new EnumList(),
    shortText: 'ich brauche Hilfe!',
    longText: 'Das Problem ist...',
    priority: new EnumList(),
    requestor: new Reporter(),
    originMIT: '',
    contacts: [new Reporter()],
    creationTime: '',
    creationDate: '',
    notes: [new TicketComment()],
  }

  get f() {
    return this.registerForm.controls
  }

  ngOnInit(): void {
    this.errorMsg = ''
    this.registerForm = this.formBuilder.group({
      prio: ['', [Validators.required]],
      type: ['', [Validators.required]],
      shortDsc: ['', [Validators.required]],
      longDsc: ['', [Validators.required]],
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
      myFormData.append('type', this.registerForm.value.type)
      if (this.createTicket(myFormData) != null) {
        this.router.navigateByUrl(this.retUrl)
      } else this.errorMsg = 'Failed to create Ticket!'
    }
  }

  save() {
    this.onSubmit()
  }

  createTicket(fd: FormData): Ticket {
    console.log(fd.get('prio'))
    Tickets.push(this.ticket)

    return this.ticket
  }
}
