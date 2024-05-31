import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../services/blog-service.service';
import { RegisterUserService } from '../services/register-user.service';
@Component({
  selector: 'app-show-all-post-of-each-user',
  templateUrl: './show-all-post-of-each-user.component.html',
  styleUrls: ['./show-all-post-of-each-user.component.css']
})
export class ShowAllPostOfEachUserComponent implements OnInit {
  showAllUserPost:any;
  constructor(private registerService:RegisterUserService) { }

  ngOnInit(): void {
    this.registerService.userPosts.subscribe((value)=>
    {
      this.showAllUserPost=value;
    })
  }


}
