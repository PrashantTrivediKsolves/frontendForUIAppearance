// import { Component, OnInit } from '@angular/core';
// import { ProfileServiceService } from '../services/profile-service.service';
// import { FollowServiceService } from '../services/follow-service.service';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.css']
// })
// export class UserProfileComponent implements OnInit {
//   userInformations:any;
//   userId:any;
//   followCounts: { [key: number]: number } = {};
//   followlers:any;
//   constructor(private profileservice:ProfileServiceService,private followUserService:FollowServiceService) { }
//   ngOnInit(): void {
//     let userStore=localStorage.getItem('user');
//     console.log(userStore);
//     let userData=userStore&&JSON.parse(userStore);
//     console.log(userData);
//     this.userId=userData.id;
//     this.profileservice.getUserProfile(this.userId)

//     .subscribe(
//       (blogs: string[]) => {
//         this.userInformations = blogs;
//         console.log(this.userInformations);
//       },
//       error => {
//         console.error('Error fetching images:', error);
//       }
//     );
//   }
//   numberOfFollowers(userId:any)
//   {
//     this.followUserService.getAllFollowersOfLoggedUser().subscribe((res)=>
//     {
//       this.followCounts[this.userId]=res.length;
//     })
//   }

// }
import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../services/profile-service.service';
import { FollowServiceService } from '../services/follow-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userInformations: any;
  userId: any;
  followCounts: { [key: number]: number } = {};
  followers: any;

  constructor(
    private profileService: ProfileServiceService,
    private followUserService: FollowServiceService
  ) {}

  ngOnInit(): void {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    this.userId = userData.id;

    this.profileService.getUserProfile(this.userId).subscribe(
      (data) => {
        this.userInformations = data;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );

    this.numberOfFollowers(this.userId);
  }

  numberOfFollowers(userId: any): void {
    this.followUserService.getAllFollowersOfLoggedUser().subscribe(
      (res) => {
        this.followCounts[this.userId] = res.length;
      },
      (error) => {
        console.error('Error fetching followers:', error);
      }
    );
  }
}
