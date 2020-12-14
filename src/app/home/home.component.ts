import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  model = {
    left: true,
    middle: false,
    right: false
  };
  page = 2;
  page1 = 3
  currentItem :any
  id: any;
  sect = 'inpit';
  focus;
  focus1;
  responseFromget_categoryApi: any;

  userList1: any[];
  lastkeydown1: any;
  loginLocalData: any;
  GmailLogin: any;
  fbLogin: any;
  userData: any;
  constructor(
    public router: Router,
    public service: ServiceService,
   
    private ngxService: NgxUiLoaderService,

  ) { 
  }

  ngOnInit() {

    this.loginLocalData = JSON.parse(localStorage.getItem('LoginResponse'))
    this.GmailLogin = JSON.parse(localStorage.getItem('gmailLogin'));
    this.fbLogin = JSON.parse(localStorage.getItem('fbLogin'));

    console.log(this.GmailLogin)
    console.log(this.loginLocalData)
    console.log(this.fbLogin)


    if(this.loginLocalData !== null 
        ||  this.GmailLogin !== null || this.fbLogin !== null ){
        this.router.navigateByUrl('/home')
        console.log('hi')
    }
    




    this.getAllcategory()
  }
  categorySelect(event) {
    console.log(event)
    console.log(this.id)

  }
  async getAllcategory() {


    try {
        this.ngxService.start();
      this.responseFromget_categoryApi = await this.service.get_category().toPromise();
      console.log(this.responseFromget_categoryApi);
     
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.ngxService.stop();

      }, 2000);
    

    } catch (error) {
      console.log(error)
      this.ngxService.stop();

    }

  }

  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('staticUserIds')).value;
    console.log(userId)
    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.userData, userId);
      }
    }
  }
 

  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };
}
