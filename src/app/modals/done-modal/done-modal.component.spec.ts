import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneModalComponent } from './done-modal.component';

describe('DoneModalComponent', () => {
  let component: DoneModalComponent;
  let fixture: ComponentFixture<DoneModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoneModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
