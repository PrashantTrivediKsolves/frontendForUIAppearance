import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {BehaviorSubject,Subject} from 'rxjs'
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class SignUpService {

  UserLoggedIn=new BehaviorSubject<boolean>(false);

  userId=new Subject<any>();

  isLoginError=new EventEmitter(false);

  subject = new Subject<String>();

  constructor(private http:HttpClient,private router:Router) { }

  signUpUser(data:any)
  {
    // this.http.post("http://localhost:8001/signup", data,{observe:'response'}).subscribe((res)=>

    this.http.post("http://localhost:8001/signup", data,{observe:'response'}).subscribe((res)=>
    {
        if(res)
        {
          console.log(res);
          this.router.navigate(['signin']);
        }
    });
  }
  signinUser(data:any)
  {
    console.log("helllo");
    const body = {
      email: data.email,
      password: data.password,
    };
    console.log(body);
    this.http.post("http://localhost:8001/login", body).subscribe(
      (res: any) => {
        console.log(res);
        if(res)
        {
          this.isLoginError.emit(false);

          localStorage.setItem('user', JSON.stringify(res));
           // Assuming server response contains user data
          this.UserLoggedIn.next(true);

          this.router.navigate(["All-blogs"]);

          let token=res.token;

          const decoded = this.getdecode(token);

          console.log("decoded id");

          console.log(decoded.id);
          // this.userId=decoded.id;
          this.userId.next(decoded.id);

          this.subject.next(decoded.username);

          console.log(decoded.username);
        }
      },
      (error) => {
        console.log('Login failed:', error);
        this.isLoginError.emit(true);
        this.UserLoggedIn.next(false);
        // Handle login error (e.g., display error message)
      }
    );
  }

  getdecode(token:string):any{
    try{
      return jwtDecode(token);
    }
    catch(error)
    {
      return error
    }
  }
}
