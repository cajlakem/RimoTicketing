import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicketWizardComponent } from './create-ticket-wizard.component';

describe('CreateTicketWizardComponent', () => {
  let component: CreateTicketWizardComponent;
  let fixture: ComponentFixture<CreateTicketWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTicketWizardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTicketWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
