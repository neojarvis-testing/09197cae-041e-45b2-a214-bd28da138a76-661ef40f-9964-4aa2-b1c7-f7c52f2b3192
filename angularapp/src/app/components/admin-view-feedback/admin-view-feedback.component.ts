import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-view-feedback',
  templateUrl: './admin-view-feedback.component.html',
  styleUrls: ['./admin-view-feedback.component.css']
})
export class AdminViewFeedbackComponent implements OnInit {

  constructor(private userService: UserService, private authservice: AuthService, private router: Router, private feedbackservice: FeedbackService) {
    // this.authservice.currentUser.subscribe(user => {
    //   this.user = user;
    // });
  }

  userDetailsToDisplay: User;

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  user: User;

  feedbacks: Feedback[] = [];

  viewDetailsModal: boolean = false;

  viewDetails(userId: number) {
    this.viewDetailsModal = true;
    this.userService.getDetails(userId).subscribe(data => {
      this.user = data;
    })
  }

  close() {
    this.viewDetailsModal = false;
  }


  loadFeedbacks(): void {
      this.feedbackservice.getFeedbacks().subscribe(
        (data) => {
          this.feedbacks = data.Result;
        },
        error => {
          console.error('Error fetching feedbacks', error);
          this.router.navigate(['/error'])
        }
      );
  }
}
