import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  constructor(public router:Router){

  }
  isLoggedIn():any {
    
    // let data = localStorage.getItem('data');
    // if(data == 'true'){
    //   return true;
    // }else{
    //   return false;
    // }


    let loginLocalData = JSON.parse(localStorage.getItem('LoginResponse'))
    let  GmailLogin = JSON.parse(localStorage.getItem('gmailLogin'));
    let  fbLogin = JSON.parse(localStorage.getItem('fbLogin'));
    

    if(loginLocalData !== null 
      ||   GmailLogin !== null ||   fbLogin !== null ){
      this.router.navigateByUrl('/home')
      console.log('hi')
      return true;
  }else{
      return false;
    }
  

  }
}
