import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
  private apiUrl = 'http://localhost:8001'; // Adjust the URL according to your backend endpoint

  constructor(private http: HttpClient) { }

  getComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllCommentOnPost/${postId}`);
  }

  addComment(comment: any): Observable<any> {
    return this.http.post<any>( `${this.apiUrl}/comment`, comment);
  }
}
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CommentServiceService {
//   private apiUrl = 'http://localhost:8001'; // Adjust the URL according to your backend endpoint

//   constructor(private http: HttpClient) { }

//   getComments(postId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/getAllCommentOnPost/${postId}`);
//   }

//   addCommentBlog(comment: any) {
//    return  this.http.post(`${this.apiUrl}/comment`, comment,{observe:'response'}).subscribe((res)=>
//       {
//           if(res)
//           {
//             console.log(res);

//           }
//       });
//   }
// }


