import { Component, OnInit } from '@angular/core';
import { EventRequirementService } from 'src/app/services/event-requirement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EventRequirement } from 'src/app/models/event-requirement.model';

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
    Date: null,
    PostedDate: new Date(),
    Status: 'Pending'
  };

  isEditMode = false;
  requirementId!: number;
  temp_Requirements: EventRequirement[] = [];
  errorMessage = '';

  constructor(private route: ActivatedRoute, private router: Router, private requirementService: EventRequirementService) {}

  ngOnInit(): void {
    this.requirementService.getAllEventRequirements().subscribe((data) => {
      this.temp_Requirements = data["data"];
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.requirementId = +id;
      this.isEditMode = true;
      this.requirementService.getEventRequirementById(this.requirementId).subscribe((data) => {
        this.newRequirement = data;
      });
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    const exists = this.temp_Requirements.find(req => req.Title.toLowerCase() === this.newRequirement.Title.toLowerCase());

    if (exists) {
      this.errorMessage = 'Requirement already exists!';
      return;
    }

    const request = this.isEditMode
      ? this.requirementService.updateEventRequirement(this.requirementId, this.newRequirement)
      : this.requirementService.addEventRequirement(this.newRequirement);

    request.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Requirement Updated Successfully!' : 'Requirement Added Successfully!');
        form.resetForm();
        this.router.navigate(['/']); 
      },
      error: () => {
        this.errorMessage = 'An error occurred while submitting the requirement.';
      }
    });
  }
}
