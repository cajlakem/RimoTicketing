import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardModalComponent } from './discard-modal.component';

describe('DiscardModalComponent', () => {
  let component: DiscardModalComponent;
  let fixture: ComponentFixture<DiscardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
