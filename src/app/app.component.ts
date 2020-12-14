import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    loginLocalData: any;
    GmailLogin: any;
    fbLogin: any;

    constructor( private renderer : Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any, private element : ElementRef, public location: Location) {}
    @HostListener('window:scroll', ['$event'])
    hasScrolled() {

        var st = window.pageYOffset;
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        var navbar = document.getElementsByTagName('nav')[0];

        // If they scrolled down and are past the navbar, add class .headroom--unpinned.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            if (navbar.classList.contains('headroom--pinned')) {
                navbar.classList.remove('headroom--pinned');
                navbar.classList.add('headroom--unpinned');
            }
            // $('.navbar.headroom--pinned').removeClass('headroom--pinned').addClass('headroom--unpinned');
        } else {
            // Scroll Up
            //  $(window).height()
            if(st + window.innerHeight < document.body.scrollHeight) {
                // $('.navbar.headroom--unpinned').removeClass('headroom--unpinned').addClass('headroom--pinned');
                if (navbar.classList.contains('headroom--unpinned')) {
                    navbar.classList.remove('headroom--unpinned');
                    navbar.classList.add('headroom--pinned');
                }
            }
        }

        lastScrollTop = st;
    };
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

      var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
          if (window.outerWidth > 991) {
              window.document.children[0].scrollTop = 0;
          }else{
              window.document.activeElement.scrollTop = 0;
          }
          this.renderer.listen('window', 'scroll', (event) => {
              const number = window.scrollY;
              if (number > 150 || window.pageYOffset > 150) {
                  // add logic
                  navbar.classList.add('headroom--not-top');
              } else {
                  // remove logic
                  navbar.classList.remove('headroom--not-top');
              }
          });
      });
      this.hasScrolled();

    //   var OneSignal = window['OneSignal'] || [];
    //   console.log("Init OneSignal");
    //   OneSignal.push(["init", {
    //     appId: "0e209b2b-c1d4-4829-96b5-c85218e6681f",
    //     autoRegister: false,
    //     allowLocalhostAsSecureOrigin: true,
    //     notifyButton: {
    //       enable: false
    //     }
    //   }]);
    //   console.log('OneSignal Initialized');
    //   OneSignal.push(function () {
    //     console.log('Register For Push');
    //     OneSignal.push(["registerForPushNotifications"])
    //   });
    //   OneSignal.push(function () {
    //     // Occurs when the user's subscription changes to a new value.
    //     OneSignal.on('subscriptionChange', function (isSubscribed) {
    //       console.log("The user's subscription state is now:", isSubscribed);
    //       OneSignal.getUserId().then(function (userId) {
    //         console.log("User ID is", userId);
    //       });
    //     });
    //   });
      }






    
}
