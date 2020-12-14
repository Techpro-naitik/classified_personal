import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { SocialAuthService } from 'angularx-social-login';
import { NgbModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  OptForm: FormGroup;
  mlb: boolean = false;
  olB: boolean = true;
  OptVerification: FormGroup
  loginLocalData: any;
  GmailLogin: any;
  fbLogin: any;
  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public service: ServiceService,
    private authService: SocialAuthService,
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    private toast: ToastrService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.OptForm = this.formBuilder.group({
      number: ['', [Validators.required,Validators.min(999999999),Validators.max(9999999999)]],

    }),
      this.OptVerification = this.formBuilder.group({
        otp: ['', [Validators.required,Validators.min(99999),Validators.max(999999)]],
      })

      this.loginLocalData = JSON.parse(localStorage.getItem('LoginResponse'))
      this.GmailLogin = JSON.parse(localStorage.getItem('gmailLogin'));
      this.fbLogin = JSON.parse(localStorage.getItem('fbLogin'));
      
   

  
  }



  showSuccess(name) {
    this.toast.success(name, '');
  }

  errorToast(error) {
    this.toast.error(error, '', {
      timeOut: 3000,
    });
  }
  async otpCall() {
    console.log(this.OptForm.value)
    try {
      let Nb = `%2B91${this.OptForm.value.number}`
      console.log(Nb)
      let Verification_Otp = await this.service.VerifyOtpCall(Nb).toPromise();
      console.log(Verification_Otp)
      this.showSuccess('otp Sent Your Mobile Number')

      this.mlb = true;
      this.olB = false
      localStorage.setItem('otp', Verification_Otp.Value)
    } catch (error) {
      console.log(error)
      this.errorToast(error.error)
    }
  }
  async otpVerifyCall() {
    try {
      let otpValue = JSON.parse(localStorage.getItem('otp'));
      console.log(otpValue)
      let Verfiy = this.OptVerification.value.otp;
      console.log(Verfiy)
      if (otpValue === Verfiy) {
        this.showSuccess('otp Verified Successfully')
        // location.reload();
        if(this.loginLocalData === null  &&  this.fbLogin === null ){
        
          console.log('h2');
          this.router.navigateByUrl('/regtraionVieOtp')
        }else{
         
          setTimeout(() => {
            location.reload();
          }, 1000);
          this.router.navigateByUrl('/home')
        }
      }
        else{
          this.errorToast('please Enter Valid Otp')
        }
  
       
        // console.log(this.OptVerification.value)
      // }
    } catch (error) {
      console.log(error)
      this.errorToast(error.error)
    }
  }
}
