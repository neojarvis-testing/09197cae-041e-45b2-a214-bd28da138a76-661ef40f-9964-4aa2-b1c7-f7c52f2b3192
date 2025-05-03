import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  public apiUrl: string = 'https://ide-bafecbaccefdfceabfeefceffaabcfcfb.premiumproject.examly.io/proxy/8080';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    const token = localStorage.getItem('currentUser'); // Get JWT token
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<Event[]>(`${this.apiUrl}/api/events`,{headers});
  }

  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/api/events/${eventId}`);
  }

  addEvent(event: Event): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/api/events`, event);

  }

  updateEvent(eventId: number, event: Event): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/events/${eventId}`, event);
  }

  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/events/${eventId}`);

  }
}
