import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventRequirement } from '../models/event-requirement.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EventRequirementService {
  private apiUrl = 'https://8080-bcbaebddefdfceabfeefceffaabcfcfb.premiumproject.examly.io';  // Define API URL properly

  constructor(private http: HttpClient) {}

  getAllEventRequirements(): Observable<EventRequirement[]> {
    return this.http.get<EventRequirement[]>(`${this.apiUrl}/api/eventrequirements`);
  }

  getEventRequirementById(eventRequirementId: number): Observable<EventRequirement> {
    return this.http.get<EventRequirement>(`${this.apiUrl}/api/eventrequirements/${eventRequirementId}`);
  }

  addEventRequirement(eventRequirement: EventRequirement): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/eventrequirements`, eventRequirement).pipe(
      catchError(error => {
        return throwError(() => new Error('Requirement already exists'));
      })
    );
  }

  updateEventRequirement(eventRequirementId: number, eventRequirement: EventRequirement): Observable<any> {
    return this.http.put<EventRequirement>(`${this.apiUrl}/api/eventrequirements/${eventRequirementId}`, eventRequirement);
  }

  deleteEventRequirement(eventRequirementId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/eventrequirements/${eventRequirementId}`);
  }
}
