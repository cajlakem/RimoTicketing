import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveReporterModalComponent } from './remove-reporter-modal.component';

describe('RemoveReporterModalComponent', () => {
  let component: RemoveReporterModalComponent;
  let fixture: ComponentFixture<RemoveReporterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveReporterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveReporterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
