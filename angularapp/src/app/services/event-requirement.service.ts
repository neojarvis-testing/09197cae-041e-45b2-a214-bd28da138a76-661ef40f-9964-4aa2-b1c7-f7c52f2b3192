import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventRequirement } from '../models/event-requirement.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EventRequirementService {
  private apiUrl: string = 'https://8080-bcbaebddefdfceabfeefceffaabcfcfb.premiumproject.examly.io'; 

  constructor(private http: HttpClient) {}

  getAllEventRequirements(): Observable<EventRequirement[]> {
    return this.http.get<EventRequirement[]>(`${this.apiUrl}/api/EventRequirements`);
  }

  getEventRequirementById(eventRequirementId: number): Observable<EventRequirement> {
    return this.http.get<EventRequirement>(`${this.apiUrl}/api/EventRequirement/${eventRequirementId}`);
  }

  addEventRequirement(eventRequirement: EventRequirement): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/EventRequirement`, eventRequirement).pipe(
      catchError(error => {
        return throwError(() => new Error('Requirement already exists'));
      })
    );
  }

  updateEventRequirement(eventRequirementId: number, eventRequirement: EventRequirement): Observable<any> {
    return this.http.put<EventRequirement>(`${this.apiUrl}/api/EventRequirement/${eventRequirementId}`, eventRequirement);
  }

  deleteEventRequirement(eventRequirementId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/EventRequirement/${eventRequirementId}`);
  }
}
