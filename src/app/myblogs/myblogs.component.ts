import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../services/blog-service.service';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {
  userId:any
  Allmyblogs:any
  constructor(private blogservice:BlogServiceService) { }
  ngOnInit(): void {
    let userStore=localStorage.getItem('user');
    console.log(userStore);
    let userData=userStore&&JSON.parse(userStore);
    console.log(userData);
    this.userId=userData.id;
    this.blogservice.getAllmyBlogs(this.userId).subscribe((res)=>
    {
      this.Allmyblogs=res;

    })
  }

}
