import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProfileServiceService {

  constructor(private http:HttpClient) { }

  getUserProfile(userId:any)
  {
    //profile/:userId...............

    return this.http.get<any[]>(`http://localhost:8001/profile/${userId}`);

  }

}
