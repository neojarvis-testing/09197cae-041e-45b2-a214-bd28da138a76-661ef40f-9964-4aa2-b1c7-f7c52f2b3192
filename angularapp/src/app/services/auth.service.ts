import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubjects to keep track of user details
  private userRole = new BehaviorSubject<string | null>(null);
  private userId = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) {}

  // Method to register a new user
  register(user: User): Observable<any> {
    return this.http.post('/api/register', user);
  }

  // Method for user login
  login(login: Login): Observable<any> {
    return new Observable((observer) => {
      this.http.post('/api/login', login).subscribe({
        next: (response: any) => {
          // Store the JWT token in localStorage
          localStorage.setItem('token', response.token);

          // Update BehaviorSubjects with user role and ID
          this.userRole.next(response.role);
          this.userId.next(response.userId);

          observer.next(response);
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }

  // Getter for userRole BehaviorSubject
  getUserRole(): Observable<string | null> {
    return this.userRole.asObservable();
  }

  // Getter for userId BehaviorSubject
  getUserId(): Observable<number | null> {
    return this.userId.asObservable();
  }

  // Method to log out the user
  logout(): void {
    localStorage.removeItem('token');
    this.userRole.next(null);
    this.userId.next(null);
  }
}