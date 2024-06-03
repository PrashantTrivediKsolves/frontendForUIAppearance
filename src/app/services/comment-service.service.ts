import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
  Allcomments=new Subject<any[]>();
  private apiUrl = 'http://localhost:8001';

  constructor(private http: HttpClient,private router:Router) { }

  getComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllCommentOnPost/${postId}`);
  }

  addComment(comment: any): Observable<any> {
    return this.http.post<any>( `${this.apiUrl}/comment`, comment);
  }

  getAllCommentsOfUser(userId:number): Observable<any[]>
  {

    const response=this.http.get<any[]>(`${this.apiUrl}/getAllcomment/${userId}`);
    this.router.navigate(["/comment"]);
    return response;
  }
}
