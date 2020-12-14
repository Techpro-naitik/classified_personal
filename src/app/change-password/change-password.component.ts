import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup
  origine: any;
  field :boolean
  field_new : boolean
  token: any;
  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public service: ServiceService,
    private ngxService: NgxUiLoaderService,

    private toast: ToastrService,
    private Activatedroute: ActivatedRoute


  ) { 
    this.Activatedroute.queryParams.subscribe((params) => {
      console.log(params.token);
    });
  }

  ngOnInit() {
    this.Activatedroute.queryParams.subscribe((params) => {
      this.token = params.token
    });
    // let parms = this.Activatedroute.snapshot.params.get('token')
    // console.log(parms.to);

    this.changePasswordForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
     
    })

    this.origine = this.Activatedroute.snapshot.paramMap.get('origine');
    console.log(this.origine)

  }

  toggle() { 
    this.field = !this.field;
  }
  
  toggleFieldTextType_new() { 
    this.field_new = !this.field_new;
  }
  showSuccess() {
    this.toast.success('Password Successfully', '');
  }

  errorToast(error) {
    this.toast.error(error, 'Error', {
      timeOut: 3000,
    });
  }

  async resetPassordApiHit() {

    // console.log(this.changePasswordForm.value)
    let token = localStorage.getItem('resetTokenResponse')
    console.log(token)

    try {
      this.ngxService.start();

      let obj = {
        token : this.token,
        username:this.changePasswordForm.value.username,
        password:this.changePasswordForm.value.password,
        confirmPassword:this.changePasswordForm.value.confirmPassword
       

      }
      let loginApiHit = await this.service.get_Token_newPassword(obj).toPromise();
      console.log(loginApiHit);
      this.showSuccess();

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.ngxService.stop();

      }, 2000);
      this.router.navigateByUrl('/login')

    } catch (error) {
      console.log(error)
      this.errorToast(error.error);
      this.ngxService.stop();

    }
  }


}