import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private signupservice:SignUpService) { }

  ngOnInit(): void {
  }
  signUp(formVal:any)
  {
    console.log(formVal);
    this.signupservice.signUpUser(formVal);
    
  }

}
