
import { RegisterUserService } from '../services/register-user.service';
import { FollowServiceService } from '../services/follow-service.service';
import { BlogServiceService } from '../services/blog-service.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, debounceTime, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CommentServiceService } from '../services/comment-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
AllUsers:any;
followCounts: { [key: number]: number } = {};
showAllUserPost:any;
searchUsers:any;
images: any;
getAlluserComments:any;
users: any[] = [];
@ViewChild('search', { static: true }) search?: ElementRef<HTMLInputElement>;
private searchSubscription?: Subscription;
constructor(private registerUser:RegisterUserService,private followservice:FollowServiceService,private blogservice:BlogServiceService,private http:HttpClient,private commentservice:CommentServiceService,private router:Router) { }

ngOnInit(): void {
    if (this.search) {
      this.searchSubscription = fromEvent(this.search.nativeElement, 'input').pipe(
        debounceTime(300),
        filter((e: any) => e.target.value.trim() !== ''),
        switchMap((e: any) => this.http.get(`http://localhost:8001/all-users/${e.target.value}`)),
        map((response: any) => response)
      ).subscribe((users: any) => {
        this.users = users;
      })
    }
}
showAllPostOfThatUsers(userId:any)
{
  this.blogservice.getAllmyBlogs(userId).subscribe((res)=>
  {
    this.showAllUserPost=res;
    this.registerUser.userPosts.next(res);
    console.log("user all posts,",res);
  })
}
showAllcomments(userId:any)
{
  this.commentservice.getAllCommentsOfUser(userId).subscribe((res)=>
  {
      if(res)
      {
        this.getAlluserComments=res;
        this.commentservice.Allcomments.next(res);
        this.router.navigate(["/comment"]);
      }
  })
}

ngOnDestroy() {
  if (this.searchSubscription) {
    this.searchSubscription.unsubscribe();
  }
}
}
