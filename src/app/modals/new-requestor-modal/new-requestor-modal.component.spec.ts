import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequestorModalComponent } from './new-requestor-modal.component';

describe('NewRequestorModalComponent', () => {
  let component: NewRequestorModalComponent;
  let fixture: ComponentFixture<NewRequestorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRequestorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRequestorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
