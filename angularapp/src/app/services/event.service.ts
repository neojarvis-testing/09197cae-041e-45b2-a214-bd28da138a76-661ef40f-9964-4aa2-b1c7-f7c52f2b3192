import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';// Assuming Event interface is defined in Event.ts

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // Public property to store backend URL
  public apiUrl = "https://8080-bfddacbabacefdfceabfeefceffaabcfcfb.premiumproject.examly.io"; // Replace '<your-workspace-port-8080-URL>' with your actual URL

  constructor(private http: HttpClient) {}

  // Helper method to get Authorization header
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Retrieve all events
  getAllEvents(): Observable<Event[]> {
    const url = `${this.apiUrl}/events`;
    return this.http.get<Event[]>(url, { headers: this.getHeaders() });
  }

  // Retrieve an event by ID
  getEventById(eventId: number): Observable<Event> {
    const url = `${this.apiUrl}/events/${eventId}`;
    return this.http.get<Event>(url, { headers: this.getHeaders() });
  }

  // Add a new event
  addEvent(event: Event): Observable<any> {
    const url = `${this.apiUrl}/events`;
    return this.http.post<any>(url, event, { headers: this.getHeaders() });
  }

  // Update an existing event
  updateEvent(eventId: number, event: Event): Observable<any> {
    const url = `${this.apiUrl}/events/${eventId}`;
    return this.http.put<any>(url, event, { headers: this.getHeaders() });
  }

  // Delete an event
  deleteEvent(eventId: number): Observable<any> {
    const url = `${this.apiUrl}/events/${eventId}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }
}
