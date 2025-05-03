import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-view-feedback',
  templateUrl: './user-view-feedback.component.html',
  styleUrls: ['./user-view-feedback.component.css']
})

export class UserViewFeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  showLogoutModal: boolean;
  showDeleteModal: boolean = false;
  feedbackId: number;


  constructor(private feedbackService: FeedbackService, private router: Router, private service: AuthService) {
    this.service.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  UserId:number=12;

  user: User = {
    UserId: 0,
    Email: "",
    Password: "",
    Username: "",
    MobileNumber: "",
    UserRole: ""
  };

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    console.log(this.user);
    const userId = this.user?.UserId; // Assuming userId is stored in localStorage
    if (userId) {
      this.feedbackService.getAllFeedbackByUserId(userId.toString()).subscribe(
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

  confirmDelete(feedbackId: number) {
    this.showDeleteModal = true;
    this.feedbackId = feedbackId;
  }

  deleteFeedback(feedbackId: string): void {
    const numericFeedbackId: number = Number(feedbackId);
    this.feedbackService.deleteFeedback(feedbackId).subscribe(
      () => {
        this.feedbacks = this.feedbacks.filter(f => f.FeedbackId != numericFeedbackId);
        alert('Feedback deleted successfully!');
      },
      error => {
        console.error('Error deleting feedback', error);
        this.router.navigate(['/view-feedback'])
      }
    );
  }

  logout(): void {
    this.showLogoutModal = true;
  }

  confirmLogout(): void {
    this.showLogoutModal = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  cancelLogout(): void {
    this.showLogoutModal = false;
  }
}
