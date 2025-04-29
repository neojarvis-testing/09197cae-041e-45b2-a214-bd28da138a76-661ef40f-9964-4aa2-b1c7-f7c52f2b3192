import { Component, OnInit } from '@angular/core';
import { EventRequirement } from 'src/app/models/event-requirement.model';
import { EventRequirementService } from 'src/app/services/event-requirement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-add-requirement',
  templateUrl: './user-add-requirement.component.html',
  styleUrls: ['./user-add-requirement.component.css'],
})
export class UserAddRequirementComponent implements OnInit {
  newRequirement: EventRequirement = {
    EventRequirementId: 0,
    Title: '',
    Description: '',
    Location: '',
    Date: null,
    PostedDate: null,
    Status: '',
  };

  isEditMode = false;
  requirementId!: number;
  showSuccessPopup = false;
  errorMessage = '';
  temp_Requirements: EventRequirement[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requirementService: EventRequirementService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.requirementId = +id;
      this.isEditMode = true;
      this.requirementService.getEventRequirementById(this.requirementId).subscribe((data) => {
        this.newRequirement = data;
      });
    }
    this.requirementService.getAllEventRequirements().subscribe((data) => {
      this.temp_Requirements = data;
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    if (this.isEditMode) {
      this.requirementService.updateEventRequirement(this.requirementId, this.newRequirement).subscribe(() => {
        this.showSuccessPopup = true;
      });
    } else {
      if (!this.temp_Requirements.some((req) => req.Title === this.newRequirement.Title)) {
        this.requirementService.addEventRequirement(this.newRequirement).subscribe({
          next: () => {
            this.showSuccessPopup = true;
            form.resetForm();
          },
        });
      } else {
        this.errorMessage = 'A requirement with the same title already exists';
      }
    }
  }

  closePopup(): void {
    this.showSuccessPopup = false;
    this.router.navigate(['/']);
  }
}
