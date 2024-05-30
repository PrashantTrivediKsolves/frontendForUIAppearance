// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// @Injectable({
//   providedIn: 'root'
// })
// export class LikeDislikeService {

//   constructor(private http:HttpClient) { }

//   likeCount(postId:any)
//   {
//     // this.http.get()
//     return this.http.get<any[]>(`http://localhost:8001/likecount/${postId}/${true}`);
//   }
//   disLikeCount(postId:any)
//   {
//     // this.http.get()
//     return this.http.get<any[]>(`http://localhost:8001/likecount/${postId}/${false}`);
//   }

//   like(data:any)
//   {
//     this.http.post("http://localhost:8001/like", data,{observe:'response'}).subscribe((res)=>
//       {
//           if(res)
//           {
//             console.log(res);
//           }
//       });
//   }

//   dislike(data:any)
//   {
//     this.http.post("http://localhost:8001/dislike", data,{observe:'response'}).subscribe((res)=>
//       {
//           if(res)
//           {
//             console.log(res);
//           }
//       });
//   }

// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeDislikeService {

  private baseUrl = 'http://localhost:8001';  // Replace with your backend API base URL

  constructor(private http: HttpClient) { }

  like(body: { userId: any; postId: any }): Observable<any> {
    return this.http.post(`${this.baseUrl}/like`, body);
  }

  dislike(body: { userId: any; postId: any }): Observable<any> {
    return this.http.post(`${this.baseUrl}/dislike`, body);
  }

  likeCount(postId: any, liked: boolean): Observable<any> {
    return this.http.get(`${this.baseUrl}/likecount/${postId}/${liked}`);
  }
}
