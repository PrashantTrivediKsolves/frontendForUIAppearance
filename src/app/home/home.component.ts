import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../services/blog-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
blogs:any;
  constructor(private blogservice:BlogServiceService) { }

  ngOnInit(): void {
    this.blogservice.getAllBlogs().subscribe(
      (blogs: any[]) => {
        this.blogs = blogs;

      },
      error => {
        console.error('Error fetching blogs:', error);
      }
    )}


}
