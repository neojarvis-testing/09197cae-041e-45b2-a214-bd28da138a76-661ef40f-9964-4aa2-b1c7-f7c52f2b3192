import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-admin-view-feedback',
  templateUrl: './admin-view-feedback.component.html',
  styleUrls: ['./admin-view-feedback.component.css']
})
export class AdminViewFeedbackComponent implements OnInit {

  constructor(private authservice: AuthService, private router: Router, private feedbackservice: FeedbackService) {
    this.authservice.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  user: User;

  feedbacks: Feedback[] = [];

  viewDetailsModal: boolean = false;

  viewDetails() {
    this.viewDetailsModal = !this.viewDetailsModal;
  }


loadFeedbacks(): void {
    const userId = this.user.UserId; // Assuming userId is stored in localStorage
    if (userId) {
      this.feedbackservice.getAllFeedbackByUserId(userId.toString()).subscribe(
        (data) => {
          this.feedbacks = data.Result;
          console.log(data.Result);
        },
        error => {
          console.error('Error fetching feedbacks', error);
          this.router.navigate(['/error'])
        }
      );
    }
  }


}
