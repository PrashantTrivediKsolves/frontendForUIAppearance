import { Component, OnInit } from '@angular/core';
import { FollowServiceService } from '../services/follow-service.service';
import { ProfileServiceService } from '../services/profile-service.service';
@Component({
  selector: 'app-show-following-user',
  templateUrl: './show-following-user.component.html',
  styleUrls: ['./show-following-user.component.css']
})
export class ShowFollowingUserComponent implements OnInit {

  followingsData:any;
  userData:any[]=[];
  userObject:any[]=[];
  constructor(private followservice:FollowServiceService,private profileservice:ProfileServiceService) {
    console.log("Following components................");
  }

  ngOnInit(): void {

    this.followservice.followlingUserData.subscribe((data)=>
    {
      this.followingsData=data;
      console.log("following data",this.followingsData);
      this.followingsData.forEach((user:any)=>
        {
          this.profileservice.getUserProfile(user.FollowId).subscribe((res)=>
            {
              this.userData=res;
              this.userObject.push(this.userData);
            })
        })
        console.log(this.userObject);
    })
  }

}
