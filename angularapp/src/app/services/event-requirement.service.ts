import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventRequirement } from '../models/event-requirement.model';

@Injectable({
  providedIn: 'root'
})
export class EventRequirementService {

  public apiUrl: string = '';

  constructor(private http: HttpClient) {}

  getAllEventRequirements(): Observable<EventRequirement[]> {
    return this.http.get<EventRequirement[]>(`${this.apiUrl}/api/eventrequirements`);
  }

  getEventRequirementById(eventRequirementId: number): Observable<EventRequirement>
  {
    return this.http.get<EventRequirement>(`${this.apiUrl}/eventrequirements/${eventRequirementId}`)
  }

  addEventRequirement(eventRequirement: EventRequirement): Observable<any>
  {
    return this.http.post<any>(`${this.apiUrl}/api/eventrequirements`, eventRequirement);
  }

  updateEventRequirement(eventRequirementId: number, eventRequirement: EventRequirement): Observable<any>
  {
    return this.http.put<EventRequirement>(`${this.apiUrl}/api/eventrequirements/${eventRequirementId}`, eventRequirement);
  }

  deleteEventRequirement(eventRequirementId: number): Observable<any>
  {
    return this.http.delete<any>(`${this.apiUrl}/api/eventrequirements/${eventRequirementId}`);
  }
}
