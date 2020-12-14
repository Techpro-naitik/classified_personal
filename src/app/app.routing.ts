import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CategoryDetailPageComponent } from './category-detail-page/category-detail-page.component';
import { DailyfeedsComponent } from './dailyfeeds/dailyfeeds.component';

import { RPassordComponent } from './rpassord/rpassord.component';
import { AddPostComponent } from './add-post/add-post.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { NotificationComponent } from './notification/notification.component';
import { RegistraionViaOtpComponent } from './registraion-via-otp/registraion-via-otp.component';

const routes: Routes =[
    { path: 'home',          component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'ForgotPassord',          component: ResetPasswordComponent },
    { path: 'ResetPassword',          component: ChangePasswordComponent },
    { path: 'dPage',          component: CategoryDetailPageComponent },
     { path: 'Feeds',          component: DailyfeedsComponent },
     { path: 'changePassword',          component: RPassordComponent },

     { path: 'AddPost',          component: AddPostComponent },
     { path: 'verify',          component: VerifyOtpComponent },
     { path: 'NotificationScreen',          component: NotificationComponent },
     { path: 'regtraionVieOtp',          component: RegistraionViaOtpComponent },


    { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
