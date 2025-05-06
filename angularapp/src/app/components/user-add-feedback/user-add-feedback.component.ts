import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-user-add-feedback',
  templateUrl: './user-add-feedback.component.html',
  styleUrls: ['./user-add-feedback.component.css']
})
export class UserAddFeedbackComponent implements OnInit {

  constructor(private service: FeedbackService, private authservice: AuthService,private router:Router) {
    this.authservice.currentUser.subscribe(user => {
      this.userId = user.UserId;
    });
  }

  userId: number = 0;

  feedbackText: string = '';
  submitted: boolean = false;
  successMessage: string = '';
  showValidationError: boolean = false;

  onSubmit(): void {
    this.submitted = true;

    if (!this.feedbackText || !this.feedbackText.trim()) {
      this.showValidationError = true;
      this.successMessage = 'Failed to add feedback!';
    } else {

      const feedback: Feedback = {
        UserId: this.userId,
        FeedbackText: this.feedbackText,
        Date: new Date()
      }

      this.service.sendFeedback(feedback).subscribe();
      this.successMessage = 'Successfully Added!';

      this.showValidationError = false;  // Reset error flag when valid feedback is submitted
      this.feedbackText = ''; // Clears input field after submission
      this.submitted = false;
    }
  }

  closePopup(): void {
    this.successMessage = '';
  }

  ngOnInit(): void {
  }

}
