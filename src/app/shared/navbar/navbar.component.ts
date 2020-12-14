import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

import {
  GoogleLoginProvider,
  FacebookLoginProvider,

} from 'angularx-social-login';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
// import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: SocialUser;
  // @Input() item: string='dksfjsdkfjskd';
  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  loginLocalData: any;
  GmailLogin: any;
  fbLogin: any;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1: NgbDate;
  model2: NgbDate;
  // items = ['item1', 'item2', 'item3', 'item4'];
  Language = [{
    id: '1', Lag: 'English' ,name:'En'
  }, {
    id: '2', Lag: 'Arabic',name:'Ar'
  }]
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  selectedDay: any;
  constructor(
    public location: Location,
    private router: Router,
    private authService: SocialAuthService,
    //  private Router:Router,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    public translate: TranslateService,
    calendar: NgbCalendar,

    ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    // translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
    this.loginLocalData = JSON.parse(localStorage.getItem('LoginResponse'))
    this.GmailLogin = JSON.parse(localStorage.getItem('gmailLogin'));
    this.fbLogin = JSON.parse(localStorage.getItem('fbLogin'));

    console.log(this.GmailLogin)
    console.log(this.loginLocalData)
    console.log(this.fbLogin)





    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else
          window.scrollTo(0, 0);
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
  }
  // switchLanguage(language: string) {
  //   console.log(language)

  //   this.translate.use(language);
  //   console.log(this.translate.use(language));
  // }
  // selectChangeHandler(event: any) {
  //   //update the ui

  //   this.selectedDay = event.target.value;
  //   console.log(this.selectedDay)
  //   // let language = localStorage.getItem('language')

  //   // this.switchLanguage(language);
  //   this.switchLanguage(this.selectedDay);


  //   // if (language != undefined) {
  //   //   console.log(this.selectedDay)
  //   //   this.switchLanguage(language);

  //   // } else {
  //   //   localStorage.setItem('language', this.selectedDay)
  //   //   this.switchLanguage(this.selectedDay);
  //   // }
  //   // this.selectedDay


  // }





  
  switchLanguage(language: string) {
    console.log(language)

    this.translate.use(language);
    console.log(this.translate.use(language));
  }
  selectChangeHandler(event: any) {
    //update the ui

    this.selectedDay = event.target.value;
    let language = localStorage.getItem('language')

    this.switchLanguage(language);
    this.switchLanguage(this.selectedDay);
    // if (language != undefined) {
    //   console.log(this.selectedDay)
    //   this.switchLanguage(language);

    // } else {
    //   localStorage.setItem('language', this.selectedDay)
    //   this.switchLanguage(this.selectedDay);
    // }
    // this.selectedDay


  }


  async signInWithGoogle() {
    let google = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    localStorage.setItem('gmailLogin', JSON.stringify(google));
    this.router.navigateByUrl('/dashboard')
    console.log(google)
  }

  async signInWithFB() {
    let fb = await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    localStorage.setItem('fbLogin', JSON.stringify(fb));
    this.router.navigateByUrl('/dashboard')
    console.log(fb)
  }


  continueWithEmail() {
    this.router.navigateByUrl('/emailVerification')
  }
  ContinueWithPhone() {
    this.router.navigateByUrl('/phoneNumber')
  }
  signOut(): void {

    this.router.navigateByUrl('/home')

    this.router.navigate(['/home'])
    localStorage.clear()
    // location.reload()
    setTimeout(() => {
      location.reload()
      // stop foreground spinner of the master loader with 'default' taskId
    }, 500)
  }



  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  isRangeStart(date: NgbDate) {
    return this.model1 && this.model2 && date.equals(this.model1);
  }
  isRangeEnd(date: NgbDate) {
    return this.model1 && this.model2 && date.equals(this.model2);
  }
  isInRange(date: NgbDate) {
    return date.after(this.model1) && date.before(this.model2);
  }
  isActive(date: NgbDate) {
    return date.equals(this.model1) || date.equals(this.model2);
  }
  endDateChanged(date) {
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day)) {
      this.model1 = this.model2;
    }
  }
  startDateChanged(date) {
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day)) {
      this.model2 = this.model1;
    }
  }
}
