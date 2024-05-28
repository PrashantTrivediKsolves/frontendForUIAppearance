import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Router ,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  status:boolean=false;
  loggedUserName:any;
  currentRoute: string = '';
  constructor(private userStatus:SignUpService,private route:Router) {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    // this.userStatus.UserLoggedIn.subscribe((res)=>{
    //   this.status=res;
    // })
    this.userStatus.subject.subscribe((name)=>
    {
      this.loggedUserName=name;
    })
    this.route.events.subscribe((val)=>
    {
      if(localStorage&&localStorage.getItem('user'))
        {
          this.userStatus.UserLoggedIn.next(true);
          this.userStatus.UserLoggedIn.subscribe((res)=>
          {
            this.status=res;
          })
        }
    })
  }
  logout()
  {
    localStorage.removeItem('user');
    this.userStatus.isLoginError.emit(false);
    this.userStatus.UserLoggedIn.next(false);
    // this.status=false;
    this.route.navigate(["home"]);

  }
  isActive(route: string): boolean {
    return this.currentRoute === route;
  }


}
