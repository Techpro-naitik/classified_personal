import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rpassord',
  templateUrl: './rpassord.component.html',
  styleUrls: ['./rpassord.component.css']
})
export class RPassordComponent implements OnInit {
  changePasswordForm: FormGroup
  origine: any;
  fieldTextType: boolean;
  fieldTextType_new: any;
  field_new: boolean;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public service: ServiceService,
    private ngxService: NgxUiLoaderService,

    private toast: ToastrService,
    private Activatedroute: ActivatedRoute


  ) { }

  ngOnInit() {

    this.changePasswordForm = this.formBuilder.group({
      username: ['', Validators.required],
      previouspassword: ['', Validators.required],
      newpassword: ['', Validators.required]
    })

    this.origine = this.Activatedroute.snapshot.paramMap.get('origine');
    console.log(this.origine)

  }


  showSuccess() {
    this.toast.success('Password Changed Successfully', '');
  }

  errorToast(error) {
    this.toast.error(error, 'Error', {
      timeOut: 3000,
    });
  }


  toggleFieldTextType() { 
    this.fieldTextType = !this.fieldTextType;
  }
  
  toggleFieldTextType_new() { 
    this.field_new = !this.field_new;
  }

  async resetPassordApiHit() {

    // console.log(this.changePasswordForm.value)
    let token = localStorage.getItem('resetTokenResponse')
    console.log(token)

    try {
      this.ngxService.start();
      let loginApiHit = await this.service.NewPasswrord(token, this.changePasswordForm.value).toPromise();
      console.log(loginApiHit);
      this.showSuccess();

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.ngxService.stop();

      }, 2000);
      this.router.navigateByUrl('/login')

    } catch (error) {
      console.log(error.error)
      this.errorToast(error.error);
      this.ngxService.stop();

    }
  }


}