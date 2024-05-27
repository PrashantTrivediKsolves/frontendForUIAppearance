import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
