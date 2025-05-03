import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  public apiUrl = "https://8080-bcbaebddefdfceabfeefceffaabcfcfb.premiumproject.examly.io";

  sendFeedback(feedback: Feedback): Observable<any> {
    return this.http.post<Feedback>(this.apiUrl + "/api/feedback", feedback);
  }

  getAllFeedbackByUserId(userId: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + "/api/feedback/user/" + userId);
  }

  deleteFeedback(feedbackId: string): Observable<any> {
    return this.http.delete<void>(this.apiUrl + "/api/feedback/user/" + feedbackId);
  }

  getFeedbacks(): Observable<any> {
    return this.http.get<Feedback[]>(this.apiUrl + "/api/feedback");
  }

}
