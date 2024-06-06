
import { RegisterUserService } from '../services/register-user.service';
import { FollowServiceService } from '../services/follow-service.service';
import { BlogServiceService } from '../services/blog-service.service';
import { OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, debounceTime, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CommentServiceService } from '../services/comment-service.service';
import { Router } from '@angular/router';
import { Component,ViewContainerRef,ComponentFactoryResolver} from '@angular/core';
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
getAlluserComments:any[]=[];
users: any[] = [];
followler: { [key: number]: number } = {};
following: { [key: number]: number } = {};
followersUser:any[]=[];
followingUser:any[]=[];
@ViewChild('search', { static: true }) search?: ElementRef<HTMLInputElement>;
private searchSubscription?: Subscription;
constructor(private registerUser:RegisterUserService,private followservice:FollowServiceService,private blogservice:BlogServiceService,private http:HttpClient,private commentservice:CommentServiceService,private router:Router,private vcr:ViewContainerRef,
  private cfr:ComponentFactoryResolver) { }

ngOnInit(): void {
    if (this.search) {
      this.searchSubscription = fromEvent(this.search.nativeElement, 'input').pipe(
        debounceTime(300),
        filter((e: any) => e.target.value.trim() !== ''),
        switchMap((e: any) => this.http.get(`http://localhost:8001/all-users/${e.target.value}`)),
        map((response: any) => response)
      ).subscribe((users: any) => {
        this.users = users;
        this.users.forEach((user)=>
        {
          this.followservice.getAllFollowingUserCount(user.id).subscribe((count)=>
            {
              this.following[user.id]=count.length;
              if(count.length>0)
              {
                  this.followingUser=count;
                  this.followservice.followlingUserData.next(this.followingUser);
              }
              // console.log("following is ",this.followingUser);
            })
            this.followservice.getAllUserFollower(user.id).subscribe((count)=>
            {
              this.followler[user.id]=count.length;
              if(count.length>0)
                {
                    this.followersUser=count;
                    this.followservice.followlersUsersData.next(this.followersUser);
                }

            })
        })
      })
      // console.log(this.followersUser);
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
  // this.followservice.getAllFollowingUserCount(userId).subscribe((count)=>
  // {
  //   this.following[userId]=count.length;
  // })
  // this.followservice.getAllUserFollower(userId).subscribe((count)=>
  // {
  //   this.followler[userId]=count.length;
  // })
}
showAllcomments(userId:any)
{
  this.commentservice.getAllCommentsOfUser(userId).subscribe((res)=>
  {
      if(res)
      {
        // this.router.navigate(["/comment"]);
        this.getAlluserComments=res;
        this.commentservice.Allcomments.next(res);
        // this.router.navigate(["/comment"]);

      }
  })
}
// showFollowler(userId:any)
// {
//   this.followservice.getAllUserFollower(userId).subscribe((res)=>
//   {
//     if(res)
//       {
//         this.followservice.followlersUsersData.next(res);
//       }
//   })
// }

// showFollowing(userId:any)
// {
//   this.followservice.getAllFollowingUserCount(userId).subscribe((res)=>
//     {
//       if(res)
//         {
//           this.followservice.followlingUserData.next(res);
//         }
//     })
// }

async showFollowler() {
  this.router.navigate(["show-followlers"]);
  const { ShowFollowerUserComponent } = await import('src/app/show-follower-user/show-follower-user.component');
  this.vcr.clear();
  const componentRef = this.vcr.createComponent(
    this.cfr.resolveComponentFactory(ShowFollowerUserComponent)
  );
  componentRef.instance.followlersData = this.followersUser; // Pass the data to the lazy-loaded component
}

async showFollowing() {
  this.router.navigate(["show-followings"]);
  const { ShowFollowingUserComponent } = await import('src/app/show-following-user/show-following-user.component');
  this.vcr.clear();
  const componentRef = this.vcr.createComponent(
    this.cfr.resolveComponentFactory(ShowFollowingUserComponent)
  );
  componentRef.instance.followingsData = this.followingUser; // Pass the data to the lazy-loaded component
}

// followingCount()
// {

// }

// followlerCount()
// {

// }

ngOnDestroy() {
  if (this.searchSubscription) {
    this.searchSubscription.unsubscribe();
  }
}
}
