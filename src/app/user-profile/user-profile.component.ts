import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../services/profile-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userInformations:any;
  userId:any;
  constructor(private profileservice:ProfileServiceService) { }
  ngOnInit(): void {
    let userStore=localStorage.getItem('user');
    console.log(userStore);
    let userData=userStore&&JSON.parse(userStore);
    console.log(userData);
    this.userId=userData.id;
    this.profileservice.getUserProfile(this.userId)

    .subscribe(
      (blogs: string[]) => {
        this.userInformations = blogs;
        console.log(this.userInformations);
      },
      error => {
        console.error('Error fetching images:', error);
      }
    );
  }

}
