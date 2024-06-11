import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';

import { HomeComponent } from './home/home.component';

import { AllBlogsComponent } from './all-blogs/all-blogs.component';

import { MyblogsComponent } from './myblogs/myblogs.component';

import { SignupComponent } from './signup/signup.component';

import { SigninComponent } from './signin/signin.component';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { FourzerofourComponent } from './fourzerofour/fourzerofour.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ShowAllPostOfEachUserComponent } from './show-all-post-of-each-user/show-all-post-of-each-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowAllCommentsComponent } from './show-all-comments/show-all-comments.component';
import { CommonModule } from '@angular/common';
import { ShowFollowingUserComponent } from './show-following-user/show-following-user.component';
import { ShowFollowerUserComponent } from './show-follower-user/show-follower-user.component';
import { ViewProfileComponent } from './view-profile/view-profile.component'
@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AllBlogsComponent,
    MyblogsComponent,
    SignupComponent,
    SigninComponent,
    CreateBlogComponent,
    UserProfileComponent,
    RegisterUserComponent,
    FourzerofourComponent,
    LandingPageComponent,
    ShowAllPostOfEachUserComponent,
    SearchUserComponent,
    ShowAllCommentsComponent,
    ShowFollowingUserComponent,
    ShowFollowerUserComponent,
    ViewProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
