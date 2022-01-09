import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTicketTitleModalComponent } from './change-ticket-title-modal.component';

describe('ChangeTicketTitleModalComponent', () => {
  let component: ChangeTicketTitleModalComponent;
  let fixture: ComponentFixture<ChangeTicketTitleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeTicketTitleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTicketTitleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
