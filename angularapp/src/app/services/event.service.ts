import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {

<<<<<<< HEAD
<<<<<<< HEAD
  public apiUrl: string = 'https://ide-ecbaabcdcedcfefdfceabfeefceffaabcfcfb.premiumproject.examly.io/proxy/8080';
=======
  public apiUrl: string = 'https://ide-bafecbaccefdfceabfeefceffaabcfcfb.premiumproject.examly.io/proxy/8080';
>>>>>>> a03234ed92ab63d5a38cd81105838c0432dd3e49
=======
  public apiUrl: string = 'https://8080-bcbaebddefdfceabfeefceffaabcfcfb.premiumproject.examly.io';
>>>>>>> 791073a29e2a26849f8f839fb0f0b4dcae211811

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
