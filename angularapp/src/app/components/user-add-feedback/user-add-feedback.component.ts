import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-add-feedback',
  templateUrl: './user-add-feedback.component.html',
  styleUrls: ['./user-add-feedback.component.css']
})
export class UserAddFeedbackComponent implements OnInit {

  constructor() { }
  feedbackText: string = '';
  submitted: boolean = false;
  successMessage: string = '';
  showValidationError: boolean = false;
  userId: 0;
 
  onSubmit(): void 
  {
    this.submitted = true;
  
    if (!this.feedbackText || !this.feedbackText.trim()) { 
      this.showValidationError = true;
      this.successMessage = 'Failed to add feedback!';
    } 
    else {
      this.showValidationError = false;  
      this.successMessage = 'Successfully Added!';
      this.feedbackText = ''; 
      this.submitted = false;
    }
  }
  
  closePopup(): void {
    this.successMessage = '';
  }

  ngOnInit(): void {
  }

}
