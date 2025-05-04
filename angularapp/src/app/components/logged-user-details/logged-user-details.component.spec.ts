import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedUserDetailsComponent } from './logged-user-details.component';

describe('LoggedUserDetailsComponent', () => {
  let component: LoggedUserDetailsComponent;
  let fixture: ComponentFixture<LoggedUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
