import { Component, OnInit } from '@angular/core';
import { EventRequirementService } from 'src/app/services/event-requirement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventRequirement } from 'src/app/models/event-requirement.model';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-add-requirement',
  templateUrl: './user-add-requirement.component.html',
  styleUrls: ['./user-add-requirement.component.css']
})

export class UserAddRequirementComponent implements OnInit {
  newRequirement: EventRequirement = {
    EventRequirementId: 0,
    Title: '',
    Description: '',
    Location: '',
    Date: new Date(),
    PostedDate: new Date(),
    Status: 'Pending',
    UserId: 0,
    EventId: 0
  };

  isEditMode = false;
  requirementId!: number;
  temp_Requirements: EventRequirement[] = [];
  temp_Events: Event[] = [];
  errorMessage = '';
  selectedEvent: number = 0;
  dateProperty: string = "";
  successMessage: string = '';


  constructor(private eventservice: EventService, private route: ActivatedRoute, private router: Router, private requirementService: EventRequirementService, private authservice: AuthService) { }

  ngOnInit(): void {
    //run 
    this.authservice.currentUser.subscribe(data => {
      this.newRequirement.UserId = data.UserId;
    })

    this.eventservice.getAllEvents().subscribe(data => {
      this.temp_Events = data;
    })

    //other part
    this.requirementService.getAllEventRequirements().subscribe((response) => {
      this.temp_Requirements = response["data"];
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.requirementId = +id;
      this.isEditMode = true;
      this.requirementService.getEventRequirementById(this.requirementId).subscribe((data) => {
        this.newRequirement = data["data"];

        // this.dateProperty = new Date(this.newRequirement.Date).toISOString().split('T')[0];
        this.eventservice.getEventById(this.newRequirement.EventId).subscribe(data => {
          this.selectedEvent = data.EventId;
        })
      });
    }
  }


  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    const exists = this.temp_Requirements.find(req => req.Title.toLowerCase() === this.newRequirement.Title.toLowerCase());

    if (exists && !this.isEditMode) {
      this.errorMessage = 'Requirement already exists!';
      return;
    }

    // this.newRequirement.Date = new Date(this.dateProperty);

    const request = this.isEditMode
      ? this.requirementService.updateEventRequirement(this.requirementId, this.newRequirement)
      : this.requirementService.addEventRequirement(this.newRequirement);

    this.newRequirement.EventId = this.selectedEvent;
    console.log(this.newRequirement);

    request.subscribe({
      next: () => {
        this.successMessage = this.isEditMode
          ? 'Requirement Updated Successfully!'
          : 'Requirement Added Successfully!';
        form.resetForm();
      },
      error: () => {
        this.errorMessage = 'An error occurred while submitting the requirement.';
      }
    });
    
  }

  closePopup(): void {
    this.successMessage = '';
    this.router.navigate([`user/app-user-view-requirement`]);
  }
}
