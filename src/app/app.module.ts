import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceService } from './service.service';
import { SocialLoginModule, SocialAuthServiceConfig   } from 'angularx-social-login';

import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryDetailPageComponent } from './category-detail-page/category-detail-page.component';
import { DailyfeedsComponent } from './dailyfeeds/dailyfeeds.component';
import { LockedGuard } from './locked.guard';
import { NouisliderModule } from 'ng2-nouislider';
import { RPassordComponent } from './rpassord/rpassord.component';
import { AddPostComponent } from './add-post/add-post.component';
import { JwPaginationComponent } from './jw-pagination/jw-pagination.component';
import { AgmCoreModule } from '@agm/core';
import { JwPaginationModule } from 'jw-angular-pagination';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { NotificationComponent } from './notification/notification.component';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CommonModule } from '@angular/common'; 
import { RegistraionViaOtpComponent } from './registraion-via-otp/registraion-via-otp.component';



export function HttpLoaderFactory(http: HttpClient) {
  
    console.log(http)

  return new TranslateHttpLoader(http,'./assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    CategoryDetailPageComponent,
    DailyfeedsComponent,
    RPassordComponent,
    AddPostComponent,
    JwPaginationComponent,
    VerifyOtpComponent,
    NotificationComponent,
    RegistraionViaOtpComponent,
    

  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    SocialLoginModule,
    NgbModule,
     CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    NgxUiLoaderModule,
    BrowserAnimationsModule,
    NouisliderModule,
    JwPaginationModule,
    // JwBootstrapSwitchNg2Module,
    // AIzaSyD4RVjcsaMi7DCm12UFlQWl9UgqDZVJ8Mc //client key
    // AIzaSyAKtu8yeyAPek9SCZNUBHIpKPEXKh2sajc
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  providers: [
    ServiceService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          // {
            // id: GoogleLoginProvider.PROVIDER_ID,
            // provider: new GoogleLoginProvider(
            //   // '84564101346-0omct62dmcrv2khlh9vo33bugmu4sb5j.apps.googleusercontent.com'
            //   // '913205427801-0074irratmtaufs25pfvrmth38h8jk63.apps.googleusercontent.com'
            // '610497129813-muukoss4v873fduoiod5971ht4d7lhok.apps.googleusercontent.com'
            // 624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com  // its worrking Key
            //   )
            // id: GoogleLoginProvider.PROVIDER_ID,
            // provider: new GoogleLoginProvider('624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com')
        // },
        // {
           //id: GoogleLoginProvider.PROVIDER_ID,
           //provider: new GoogleLoginProvider(
          //   // '84564101346-0omct62dmcrv2khlh9vo33bugmu4sb5j.apps.googleusercontent.com'
          //   // '913205427801-0074irratmtaufs25pfvrmth38h8jk63.apps.googleusercontent.com'
          // '610497129813-muukoss4v873fduoiod5971ht4d7lhok.apps.googleusercontent.com'
          // 624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com  // its worrking Key
          //   )
          
      //      id: GoogleLoginProvider.PROVIDER_ID,
      //      provider: new GoogleLoginProvider('624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com')
      //  },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            // 3458118904263858 
            //188108536296855
            provider: new FacebookLoginProvider('3458118904263858')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    LockedGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
