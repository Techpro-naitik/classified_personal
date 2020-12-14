import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from  'angularx-social-login';

import {
    GoogleLoginProvider,
    FacebookLoginProvider,
   
  } from 'angularx-social-login';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { NgbDate, NgbModal, NgbCalendar, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;

  loginForm: FormGroup
  user: SocialUser;
  fieldTextType: boolean;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1 : NgbDate;
  model2 : NgbDate;
  olB : Boolean =true;
  mlb : Boolean = false ;
  // focus;
  // focus1;
  focus2;
  focus3;
  focus4;
  OptForm: FormGroup;
  getDataFormLocal_local: any;
  getDataFormLocal_gmail: any;
  getDataFormLocal_fb: any;
  constructor(
    public router:Router,
    public formBuilder: FormBuilder,
    public service :ServiceService,
    private authService: SocialAuthService,
    private modalService: NgbModal, 
    private calendar: NgbCalendar,
    private toast: ToastrService,
    private ngxService: NgxUiLoaderService,
    public translate: TranslateService


    ) {
      // this.fromDate = calendar.getToday();
      // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
     }

  ngOnInit() {

    

    this.getDataFormLocal_local = JSON.parse(localStorage.getItem('LoginResponse'))
    this.getDataFormLocal_gmail = JSON.parse(localStorage.getItem('gmailLogin'))
    this.getDataFormLocal_fb = JSON.parse(localStorage.getItem('fbLogin'))

    console.log(this.getDataFormLocal_local)
    console.log(this.getDataFormLocal_gmail)
    console.log(this.getDataFormLocal_fb)
    if( this.getDataFormLocal_fb==null){
        this.router.navigate['/home']
    }

    if(this.getDataFormLocal_local!==null || this.getDataFormLocal_fb!=null){
              
      this.router.navigateByUrl('home')
    }else{
      
                
      // this.errorToast("Please Login")
    }




    this.authService.authState.subscribe(user => {
      this.user = user;
    });
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  
  }

  showSuccess() {
    this.toast.success('Login Successfully');
        }
  
  errorToast(error){
    this.toast.error(error, 'Error', {
      timeOut: 3000,
    });
  }

async  login() {
  
  console.log(this.loginForm.value)
  

    try{
      this.ngxService.start(); 
      let responseFromLogin_Api = await this.service.login_Call(this.loginForm.value).toPromise();
      console.log(responseFromLogin_Api);
      this.showSuccess()
      localStorage.setItem('LoginResponse',JSON.stringify(responseFromLogin_Api));
      // this.ngxService.stop();

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.ngxService.stop();

      }, 2000);

      this.router.navigateByUrl('/home')
      
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        location.reload()
      }, 2000);
    }catch(error){
      console.log(error)
      this.errorToast(error.error)
      this.ngxService.stop();

    }
   
    }
    

    async signInWithGoogle(){
      let google =await  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      console.log(google)
    }
  
    async signInWithFB() {
     let fb = await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
   
    console.log(fb)

     let obj = {
      
        "id":fb.id ,
        "fullName": fb.name,
        "provider":1,
        "photoUrl": fb.photoUrl
      
     }

     let fb_Registraion = await this.service.RigExternal(obj).toPromise();
    //  localStorage.setItem('fbLogin',JSON.stringify(fb_Registraion));
  
    let RegDetail  = await this.service.getExitenceRegis(obj.id).toPromise();
    let fbObj = JSON.parse(RegDetail)
     console.log(fbObj)

     let facebookObj = {
      'creationDate':fbObj.creationDate,
      'externalLoginID': fbObj.externalLoginID,
      'fullName': fbObj.fullName,
      'id': fbObj.id,
      'lastLoggedIn':fbObj.lastLoggedIn,
      'provider': fbObj.provider
     }
     console.log(facebookObj)
    localStorage.setItem('fbLogin',JSON.stringify(facebookObj));

     this.router.navigateByUrl('/home')
     setTimeout(() => { 
      /** spinner ends after 5 seconds */
      location.reload()
    }, 1000);
    }



    toggleFieldTextType() { 
      this.fieldTextType = !this.fieldTextType;
    }
    
  open(content, type, modalDimension) {
    console.log(content,type,modalDimension)
    if (modalDimension === 'sm' && type === 'modal_mini') {
        this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          console.log(reason)
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
        this.modalService.open(content,{ centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
}

private getDismissReason(reason: any): string {
  debugger
  console.log(reason)
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}

// isRangeStart(date: NgbDate){
//   return this.model1 && this.model2 && date.equals(this.model1);
// }
// isRangeEnd(date: NgbDate){
//   return this.model1 && this.model2 && date.equals(this.model2);
// }
// isInRange(date: NgbDate){
//   return date.after(this.model1) && date.before(this.model2);
// }
// isActive(date: NgbDate){
//   return date.equals(this.model1) || date.equals(this.model2);
// }
// endDateChanged(date){
//   if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
//     this.model1 = this.model2;
//   }
// }
// startDateChanged(date){
//   if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
//     this.model2 = this.model1;
//   }
// }


  }
