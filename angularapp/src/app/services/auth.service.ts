import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { tap } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
<<<<<<< HEAD
  public baseUrl = 'https://ide-ecbaabcdcedcfefdfceabfeefceffaabcfcfb.premiumproject.examly.io/proxy/8080';
=======
  public baseUrl = 'https://ide-bafecbaccefdfceabfeefceffaabcfcfb.premiumproject.examly.io/proxy/8080/api';
>>>>>>> a03234ed92ab63d5a38cd81105838c0432dd3e49
=======
  public baseUrl = 'https://8080-bcbaebddefdfceabfeefceffaabcfcfb.premiumproject.examly.io/api';
  //https://ide-bcbaebddefdfceabfeefceffaabcfcfb.premiumproject.examly.io/proxy/8080/
>>>>>>> 791073a29e2a26849f8f839fb0f0b4dcae211811

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
 
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
 
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
 
  register(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, newUser);
  }
 
  login(loginData: Login): Observable<any> {
    return this.http.post<{ token: string; user: User }>(`${this.baseUrl}/login`, loginData).pipe(
      tap(response => {
        console.log('Login API response:', response);
        const token = response.token;
        const user = response.User;
        console.log('Storing token:', token);
        console.log('Storing user:', user);      
        if (token && user) {
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      })
    );
  }
 
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }
 
  getUserRole(): string | null {
    const user = this.currentUserValue;
    return user ? user.UserRole : null;
  }
 
  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }
 
  isUser(): boolean {
    return this.getUserRole() === 'User';
  }
 
  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
 