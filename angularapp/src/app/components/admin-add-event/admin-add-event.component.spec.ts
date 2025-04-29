import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminAddEventComponent } from './admin-add-event.component';

describe('AdminAddEventComponent', () => {
  let component: AdminAddEventComponent;
  let fixture: ComponentFixture<AdminAddEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ AdminAddEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  fit('Frontend_should_create_admin_add_event_component', () => {
    expect(component).toBeTruthy();
  });

});
