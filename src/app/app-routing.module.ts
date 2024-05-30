import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AllBlogsComponent } from './all-blogs/all-blogs.component';

import { MyblogsComponent } from './myblogs/myblogs.component';

import { SignupComponent } from './signup/signup.component';

import { SigninComponent } from './signin/signin.component';

import { CreateBlogComponent } from './create-blog/create-blog.component';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"All-blogs",
    component:AllBlogsComponent
  },
  {
    path:"my-blogs",
    component:MyblogsComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"signin",
    component:SigninComponent
  }
  ,
  {
    path:"create-Blog",
    component:CreateBlogComponent
  },
  {
    path:"userProfile",
    component:UserProfileComponent
  }
  ,
  {
    path:"All-users",
    component:RegisterUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
