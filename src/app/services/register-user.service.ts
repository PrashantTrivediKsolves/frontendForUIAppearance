import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Subject ,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  userPosts=new Subject<any>();
  constructor(private http:HttpClient) { }

  searchUsers=new Subject<any>();

  getAllUsers()
  {
    return this.http.get("http://localhost:8001/all-users");
  }

  // private baseUrl = '"http://localhost:8001/all-users"'; // Replace with your backend API URL

  // searchUsers(query: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/searchusers`, { params: { q: query } });
  // }
}
