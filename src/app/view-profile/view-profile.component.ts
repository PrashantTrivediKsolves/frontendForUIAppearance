import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../services/profile-service.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  viewProfileData:any;
  constructor(private profileservice:ProfileServiceService) { }

  ngOnInit(): void {
    this.profileservice.userViewProfile.subscribe((data)=>
    {
      this.viewProfileData=data;
    })
  }

}
