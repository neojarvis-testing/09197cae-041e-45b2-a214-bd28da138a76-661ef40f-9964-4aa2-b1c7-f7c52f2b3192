import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddRequirementComponent } from './user-add-requirement.component';

describe('UserAddRequirementComponent', () => {
  let component: UserAddRequirementComponent;
  let fixture: ComponentFixture<UserAddRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
