import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

  constructor(private http:HttpClient) { }

  addBlog(formData:any)
  {
    this.http.post<any>('http://localhost:8001/upload', formData)
      .subscribe(
        response => {
          console.log('File uploaded successfully:', response);
          // Handle success......
        },
        error => {
          console.error('Error uploading file:', error);
          // Handle error
        }
      );
  }
  
  getAllBlogs()
  {
    return this.http.get<any[]>('http://localhost:8001/uploads');
  }
}
