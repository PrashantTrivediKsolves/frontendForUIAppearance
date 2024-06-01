// import { Component, OnInit } from '@angular/core';
// import { SignUpService } from '../services/sign-up.service';
// import { Router ,NavigationEnd } from '@angular/router';
// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {
//   status:boolean=false;
//   loggedUserName:any;
//   currentRoute: string = '';
//   constructor(private userStatus:SignUpService,private route:Router) {
//     this.route.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.currentRoute = event.url;
//       }
//     });
//   }

//   ngOnInit(): void {
//     // this.userStatus.UserLoggedIn.subscribe((res)=>{
//     //   this.status=res;
//     // })
//     this.userStatus.subject.subscribe((name)=>
//     {
//       this.loggedUserName=name;
//     })
//     this.route.events.subscribe((val)=>
//     {
//       if(localStorage&&localStorage.getItem('user'))
//         {
//           this.userStatus.UserLoggedIn.next(true);
//           this.userStatus.UserLoggedIn.subscribe((res)=>
//           {
//             this.status=res;
//           })
//         }
//     })
//   }
//   logout()
//   {
//     localStorage.removeItem('user');
//     this.userStatus.isLoginError.emit(false);
//     this.userStatus.UserLoggedIn.next(false);
//     // this.status=false;
//     this.route.navigate(["home"]);

//   }
//   isActive(route: string): boolean {
//     return this.currentRoute === route;
//   }


// }

import { Component, OnInit, OnDestroy ,ViewChild,ElementRef, AfterViewInit} from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Router, NavigationEnd } from '@angular/router';

import { fromEvent ,Subscription} from 'rxjs';

import {ajax} from 'rxjs/ajax';

import {map,filter, switchMap, debounceTime} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { RegisterUserService } from '../services/register-user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  status: boolean = false;
  loggedUserName: any | null = '';
  currentRoute: string = '';
  @ViewChild('search')
  search?:ElementRef
  private subscriptions: Subscription = new Subscription();

  constructor(private userStatus: SignUpService, private route: Router,private http:HttpClient,private registeruser:RegisterUserService) {}
  users:any;
  ngOnInit(): void {
    // Subscribe to route changes

    this.subscriptions.add(
      this.route.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
        }
      })
    );

    // Subscribe to the user status
    this.subscriptions.add(
      this.userStatus.UserLoggedIn.subscribe(res => {
        this.status = res;
      })
    );

    // Subscribe to the user's name changes
    this.subscriptions.add(
      this.userStatus.subject.subscribe(name => {
        this.loggedUserName = name;
      })
    );

    // Check if the user is logged in on initialization
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userStatus.UserLoggedIn.next(true);
      this.loggedUserName = user.name;
    }

    if (this.search) {
      this.subscriptions = fromEvent(this.search.nativeElement, 'input').pipe(
        debounceTime(300),
        filter((e: any) => e.target.value.trim() !== ''),
        switchMap((e: any) => this.http.get(`http://localhost:8001/all-users/${e.target.value}`)),
        map((response: any) => response)
      ).subscribe((users: any) => {
        this.users = users;
        this.registeruser.searchUsers.next(users);
      });
    }

  }

  logout(): void {
    this.userStatus.clearUser();
    this.route.navigate(['home']);
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to avoid memory leaks
    this.subscriptions.unsubscribe();
  }



}

