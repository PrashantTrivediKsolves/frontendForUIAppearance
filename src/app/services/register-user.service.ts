import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http:HttpClient) { }

  getAllUsers()
  {
    return this.http.get("http://localhost:8001/all-users");
  }
}
