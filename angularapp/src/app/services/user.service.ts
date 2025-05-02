import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public apiUrl = "https://ide-bafecbaccefdfceabfeefceffaabcfcfb.premiumproject.examly.io/proxy/8080/api"

  getDetails(userId: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/users/userDetails/" + userId);
  }


}
