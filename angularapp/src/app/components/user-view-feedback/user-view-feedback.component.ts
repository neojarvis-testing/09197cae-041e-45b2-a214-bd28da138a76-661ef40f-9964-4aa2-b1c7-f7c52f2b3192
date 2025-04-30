import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view-feedback',
  templateUrl: './user-view-feedback.component.html',
  styleUrls: ['./user-view-feedback.component.css']
})
export class UserViewFeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  showLogoutModal: boolean;
  showDeleteModal: boolean = false;
 

  constructor(private feedbackService: FeedbackService, private router: Router) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    if (userId) {
      this.feedbackService.getAllFeedbackByUserId(userId).subscribe(
        (data: Feedback[]) => {
          this.feedbacks = data;
        },
        error => {
          console.error('Error fetching feedbacks', error);
        }
      );
    }
  }


  delete(feedbackId: string): void { 
    const numericFeedbackId: number = Number(feedbackId);
    this.feedbackService.deleteFeedback(feedbackId).subscribe( 
      () => { this.feedbacks = this.feedbacks.filter(f => f.FeedbackId != numericFeedbackId); 
        alert('Feedback deleted successfully!'); 
      }, 
      error => { console.error('Error deleting feedback', error); 
    } );
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
