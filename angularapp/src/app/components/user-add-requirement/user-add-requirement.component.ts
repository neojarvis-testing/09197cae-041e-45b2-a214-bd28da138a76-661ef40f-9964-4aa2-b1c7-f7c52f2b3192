import { Component, OnInit } from '@angular/core';
import { EventRequirement } from 'src/app/models/event-requirement.model';
import { EventRequirementService } from 'src/app/services/event-requirement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-add-requirement',
  templateUrl: './user-add-requirement.component.html',
  styleUrls: ['./user-add-requirement.component.css']
})
export class UserAddRequirementComponent implements OnInit {
  newRequirement: EventRequirement = {
    Title: '',
    Description: '',
    Location: '',
    Date: ''
  }
  isEditMode = false;
  requirementId: number;
  showSuccessPopup = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private router: Router, private requirementService: EventRequirementService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.requirementId = +id;
      this.isEditMode = true;
      this.requirementService.getEventRequirementById(+id).subscribe(data => { this.newRequirement = data });
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    if (this.isEditMode) {
      this.requirementService.updateEventRequirement(this.requirementId, this.newRequirement).subscribe(() => {
        this.showSuccessPopup = true;
      });
    } 
    else {
      this.requirementService.addEventRequirement(this.newRequirement).subscribe({
        next: () => {
          this.showSuccessPopup = true;
          form.resetForm();
        },
        error: err => {
          if (err.status === 400) {
            this.errorMessage = err.error.message; // handle duplicate title error
          }
        }
      });
    }
  }

  closePopup(): void {
    this.showSuccessPopup = false;
    this.router.navigate(['/']);
  }
}






