import { Component, OnInit } from '@angular/core';
import { RegisterUserService } from '../services/register-user.service';
import { FollowServiceService } from '../services/follow-service.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  AllUsers:any;
  followCounts: { [key: number]: number } = {};
  constructor(private registerUser:RegisterUserService,private followservice:FollowServiceService) { }

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
    this.followservice.FollowUser(body);
  }
  UnFollowMe(followerId:any)
  {
    const body={
      FollowId:followerId,
    }
    this.followservice.UnFollowUser(body);
  }


}
