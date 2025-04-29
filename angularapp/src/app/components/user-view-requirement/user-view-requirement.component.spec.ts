import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserViewRequirementComponent } from './user-view-requirement.component';

describe('UserViewRequirementComponent', () => {
  let component: UserViewRequirementComponent;
  let fixture: ComponentFixture<UserViewRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ UserViewRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_user_view_requirement_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_event_requirements_heading_in_the_user_view_requirement_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Event Requirements');
  });
});
