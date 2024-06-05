import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { SignUpService } from './sign-up.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BlogServiceService {

  constructor(private http:HttpClient,private signupservice:SignUpService) { }

  addBlog(formData:any)
  {
    // console.log(this.signupservice.userId);

    // formData.append('userId',this.signupservice.userId);

    this.http.post<any>('http://localhost:8001/upload', formData)
      .subscribe(
        response => {
          console.log('File uploaded successfully:', response);

          // Handle success................
        },
        error => {
          console.error('Error uploading file:', error);
          // Handle error............
        }
      );
  }

  getAllBlogs()
  {
    return this.http.get<any[]>('http://localhost:8001/uploads');
  }

  getAllmyBlogs(userId:any)
  {
    return this.http.get<any[]>(`http://localhost:8001/getAllTheBlogsOfUser/${userId}`);
  }

}
