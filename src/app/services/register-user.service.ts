import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  userPosts=new Subject<any>();
  constructor(private http:HttpClient) { }

  getAllUsers()
  {
    return this.http.get("http://localhost:8001/all-users");
  }
}
