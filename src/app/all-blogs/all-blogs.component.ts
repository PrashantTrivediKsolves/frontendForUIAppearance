import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../services/blog-service.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {
  blogs:any;
  constructor(private blogservice:BlogServiceService) { }

  ngOnInit(): void {
    this.blogservice.getAllBlogs()
    .subscribe(
      (blogs: string[]) => {
        this.blogs = blogs;
        console.log(blogs);
      },
      error => {
        console.error('Error fetching images:', error);
      }
    );

  }

}
