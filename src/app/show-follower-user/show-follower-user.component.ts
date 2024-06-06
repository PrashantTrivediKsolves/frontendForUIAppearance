import { Component, OnInit, OnDestroy } from '@angular/core';
import { FollowServiceService } from '../services/follow-service.service';
import { Subscription } from 'rxjs';
import { ProfileServiceService } from '../services/profile-service.service';

@Component({
  selector: 'app-show-follower-user',
  templateUrl: './show-follower-user.component.html',
  styleUrls: ['./show-follower-user.component.css']
})
export class ShowFollowerUserComponent implements OnInit, OnDestroy {
  followlersData: any[] = [];

  userObject:any[]=[];
  followlersSubscription?: Subscription;
  userData:any[]=[];
  constructor(private followservice: FollowServiceService,private profileservice:ProfileServiceService) {
    console.log("Follower component initialized...");
  }

  ngOnInit(): void {
    this.followlersSubscription = this.followservice.followlersUsersData.subscribe((data) => {
      this.followlersData = data;
      console.log("Followers data received:", this.followlersData);
      this.followlersData.forEach((user)=>
      {
        this.profileservice.getUserProfile(user.userIdkey).subscribe((res)=>
          {
            this.userData=res;
            this.userObject.push(this.userData);
          })
      })
      console.log(this.userObject);
    });

  }

  // getUserDetails(userId:any)
  // {
  //   this.profileservice.getUserProfile(userId).subscribe((res)=>
  //   {
  //     this.userData=res;
  //   })
  // }


  ngOnDestroy(): void {
    if (this.followlersSubscription) {
      this.followlersSubscription.unsubscribe();
    }
  }
}
