import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogServiceService } from '../services/blog-service.service';
@Component({

  selector: 'app-create-blog',

  templateUrl: './create-blog.component.html',

  styleUrls: ['./create-blog.component.css'],

})

export class CreateBlogComponent implements OnInit {

  ngOnInit(): void {
  }
  images:any;
  selectedFile: File | null = null;
  constructor(private http: HttpClient,private blogservice:BlogServiceService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  title:any;
  content:any;
  submitForm(data:any)
  {
    // this.username=data.username;
    // console.log(data.username);
    console.log(data);
    this.title=data.title;
    this.content=data.content;
    // this.selectedFile=data.file;
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();

    formData.append('file', this.selectedFile);
    formData.append('title', this.title);
    formData.append('content',this.content);
    this.blogservice.addBlog(formData);
    // formData.append('username',this.username!);

  }
  getAllFiles()
  {
    this.blogservice.getAllBlogs()
      .subscribe(
        (images: string[]) => {
          this.images = images;
          console.log(images);
        },
        error => {
          console.error('Error fetching images:', error);
        }
      );
  }


}
