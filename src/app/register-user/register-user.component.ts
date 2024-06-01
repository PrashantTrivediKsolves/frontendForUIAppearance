import { Component, OnInit } from '@angular/core';
import { RegisterUserService } from '../services/register-user.service';
import { FollowServiceService } from '../services/follow-service.service';
import { BlogServiceService } from '../services/blog-service.service';



@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  AllUsers:any;
  followCounts: { [key: number]: number } = {};
  showAllUserPost:any;

  constructor(private registerUser:RegisterUserService,private followservice:FollowServiceService,private blogservice:BlogServiceService) { }

  ngOnInit(): void {
    this.registerUser.getAllUsers().subscribe((res)=>
    {
      this.AllUsers=res;

      this.AllUsers.forEach((user:any)=>
      {
        this.fetchFollowlersCount(user.id);
      })
    })
  }
  usersFollowlers(userId:any)
  {
    this.registerUser.getAllUsers().subscribe((res)=>
      {
        this.AllUsers=res;

        this.AllUsers.forEach((user:any)=>
        {
          this.fetchFollowlersCount(user.id);
        })
      })
  }
  fetchFollowlersCount(userId: any) {
    this.followservice.getAllUserFollower(userId).subscribe((res: any) => {
      this.followCounts[userId] = res.length;
    });
  }
  FollowMe(followId:any){
    const body={
      FollowId:followId,
    }
    if(confirm('Are you sure you want to follow'))
    {
        this.followservice.FollowUser(body);
    }
    alert('user Follow successFull');
  }
  UnFollowMe(followerId:any)
  {
    const body={
      FollowId:followerId,
    }
    if(confirm('Are you sure you want to unfollow'))
    {
      this.followservice.UnFollowUser(body);
    }
    alert('user unFollow successFull');
  }
  showAllPostOfThatUsers(userId:any)
  {
    this.blogservice.getAllmyBlogs(userId).subscribe((res)=>
    {
      this.showAllUserPost=res;
      this.registerUser.userPosts.next(res);
    })
  }
}

