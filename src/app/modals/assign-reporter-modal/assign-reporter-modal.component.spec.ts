import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignReporterModalComponent } from './assign-reporter-modal.component';

describe('AssignReporterModalComponent', () => {
  let component: AssignReporterModalComponent;
  let fixture: ComponentFixture<AssignReporterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignReporterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignReporterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
