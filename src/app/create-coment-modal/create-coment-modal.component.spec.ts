import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComentModalComponent } from './create-coment-modal.component';

describe('CreateComentModalComponent', () => {
  let component: CreateComentModalComponent;
  let fixture: ComponentFixture<CreateComentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
