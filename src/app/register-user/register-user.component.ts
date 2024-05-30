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

  constructor(private registerUser:RegisterUserService,private followservice:FollowServiceService) { }

  ngOnInit(): void {
    this.registerUser.getAllUsers().subscribe((res)=>
    {
      this.AllUsers=res;
    })
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
