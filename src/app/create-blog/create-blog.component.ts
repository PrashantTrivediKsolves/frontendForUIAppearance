import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogServiceService } from '../services/blog-service.service';
import { SignKeyObjectInput } from 'crypto';
import { SignUpService } from '../services/sign-up.service';
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
  constructor(private http: HttpClient,private blogservice:BlogServiceService,private signupservice:SignUpService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  title:any;
  content:any;

  userId:any;
  submitForm(data:any)
  {
    // this.username=data.username;
    // console.log(data.username);
    console.log(data);
    this.title=data.title;
    this.content=data.content;
    let userStore=localStorage.getItem('user');
    console.log(userStore);
    let userData=userStore&&JSON.parse(userStore);
    console.log(userData);
    this.userId=userData.id;
    // this.signupservice.userId.subscribe((res)=>
    // {
    //   this.userId=res;
    // })
    console.log("blog  user id");
    console.log(this.userId);
    // this.selectedFile=data.file;
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();

    formData.append('file', this.selectedFile);
    formData.append('title', this.title);
    formData.append('content',this.content);
    formData.append('userId',this.userId);
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
