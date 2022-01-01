import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpofileComponent } from './userpofile.component';

describe('UserpofileComponent', () => {
  let component: UserpofileComponent;
  let fixture: ComponentFixture<UserpofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserpofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
