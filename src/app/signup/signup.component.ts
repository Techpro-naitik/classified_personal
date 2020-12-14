import { Component, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    user: SocialUser;

    test: Date = new Date();
    focus;
    focus1;
    focus2;
    focus3;
    focus4;
    focus5;
   public registerForm:FormGroup
  fieldTextType: boolean;
    constructor(
        private service: ServiceService,
         private router: Router ,
         private fb:FormBuilder,
        //  private Event:EventService,
        private toast: ToastrService,
        private ngxService: NgxUiLoaderService,

         private authService: SocialAuthService,
         ) { }

    ngOnInit() {
        this.authService.authState.subscribe(user => {
            this.user = user;
          });
       this.registerForm=this.fb.group(
           {
            
              userName:['',Validators.required],
              email:['',Validators.required],
              fullName:['',Validators.required],
             mobileNumber:['',Validators.required],
              password:['',Validators.required],
          
           }
       ) 
    }



    showSuccess() {
      this.toast.success('Register Successfully', '');
          }
    
    errorToast(error){
      this.toast.error(error, '', {
        timeOut: 3000,
      });
    }
async register(){

try{
  let RegisterValue ={
    userName:this.registerForm.value.userName,
    email:this.registerForm.value.email,
    fullName:this.registerForm.value.fullName,

    mobileNumber:this.registerForm.value.mobileNumber,
    password:this.registerForm.value.password

}
this.ngxService.start();

 let responseFromRegister_Api= await this.service.registration_Call(RegisterValue).toPromise()
  console.log(responseFromRegister_Api);

  this.showSuccess();
//   this.Event.publish('pushEvent',  "hello");
  setTimeout(() => {
    this.ngxService.stop();
    // stop foreground spinner of the master loader with 'default' taskId
  }, 2000)
  this.router.navigateByUrl('/login')
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    location.reload()
  }, 1000);
}
catch(error)
{
  console.log(error)

console.log(error.error)
let error_error = error.error
this.ngxService.stop();

this.errorToast(error_error)
}
}

async signInWithGoogle() {
    let  google = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log(google);
    localStorage.setItem('gmailLogin',JSON.stringify(google));
    this.router.navigateByUrl('/home')
    console.log(google)
  }

  async signInWithFB(){
  let  fb = await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  localStorage.setItem('fbLogin',JSON.stringify(fb));
  this.router.navigateByUrl('/home')
//   location.reload()
  console.log(fb)
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    location.reload()
  }, 1000);
  }
  toggleFieldTextType() { 
    this.fieldTextType = !this.fieldTextType;
  }
}