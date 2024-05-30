import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FollowServiceService {
  userId:any;
  constructor(private http:HttpClient) {
    let userStore=localStorage.getItem('user');
    console.log(userStore);
    let userData=userStore&&JSON.parse(userStore);
    console.log(userData);
    this.userId=userData.id;
  }



  FollowUser(followerId:any){
    this.http.post(`http://localhost:8001/follow/${this.userId}`, followerId,{observe:'response'}).subscribe((res)=>
      {
          if(res)
          {
            console.log(res);
          }
      });
  }
  UnFollowUser(followerId:any){
    this.http.post(`http://localhost:8001/unfollow/${this.userId}`, followerId,{observe:'response'}).subscribe((res)=>
      {
          if(res)
          {
            console.log(res);
          }
      });
  }


}
