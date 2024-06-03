import { Component, OnInit } from '@angular/core';
import { CommentServiceService } from '../services/comment-service.service';

@Component({
  selector: 'app-show-all-comments',
  templateUrl: './show-all-comments.component.html',
  styleUrls: ['./show-all-comments.component.css']
})

export class ShowAllCommentsComponent implements OnInit {

  showAllComments: any[]=[];

  users:any;

  constructor(private commentservice: CommentServiceService) { }

  ngOnInit(): void {

    this.commentservice.Allcomments.subscribe((res) => {

      console.log(typeof res);

      this.showAllComments = res;

      this.users=res;

      console.log("comments", this.showAllComments);

      this.users.forEach((user:any)=>
      {
        console.log(user);
      });
    });
  }
}
