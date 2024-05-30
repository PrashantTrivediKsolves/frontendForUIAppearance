import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { HttpClient } from '@angular/common/http';
import { BlogServiceService } from '../services/blog-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  selectedFile: File | null = null;
  constructor(private http: HttpClient,private blogservice:BlogServiceService,private signupservice:SignUpService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  ngOnInit(): void {
  }
  signUp(formVal:any)
  {
    console.log(formVal);
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('username',formVal.username);
    formData.append('email',formVal.email);
    formData.append('password',formVal.password);
    formData.append('file', this.selectedFile);
    this.signupservice.signUpUser(formData);

  }
}
