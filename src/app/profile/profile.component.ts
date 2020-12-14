import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import {AgmMap, MapsAPILoader  } from '@agm/core';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
// import { Loader } from '@googlemaps/loader';


declare const google: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})



export class ProfileComponent implements OnInit {
  getDataFormLocal_local: string;
  getDataFormLocal_gmail: string;
  getDataFormLocal_fb: string;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1 : NgbDate;
  model2 : NgbDate;
  openFile : boolean = false;
  // @ViewChild('mapDiv') mapDiv: ElementRef;

  // public map: google.maps.Map;
  // private markers: google.maps.Marker[] = [];
  // private clickListener: google.maps.MapsEventListener;
  // latitude = 51.678418;
  // longitude = 7.809007;

  @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap;  

    // items = ['item1', 'item2', 'item3', 'item4'];
    focus;
    focus1;
    focus2;
    focus3;
    focus4;
    Edit_inter_Ext :FormGroup
  zoom: number;
  editName :boolean = false
  editForm : boolean = true;
  // lat: number=51.678418;
  // lng: number=7.809007;
  getAddress: any;
    lng: number;
    lat: number;
    EditProfileForm : FormGroup;
  open_Adds: boolean = false;
    constructor(
        public router:Router,
        private modalService: NgbModal, 
        calendar: NgbCalendar,
        private toast: ToastrService,

        private apiloader: MapsAPILoader,
        public formBuilder : FormBuilder,
        public service :ServiceService
    ) {

     }

    ngOnInit() {
      this.getProfile();
      this.agmMap.triggerResize(true);  
       this.zoom = 16;  
       navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        console.log( this.lng)
        console.log( this.lat)
        let location = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        console.log(location)
        // this.map.panTo(location);

      });




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
                   




        }else{
          this.router.navigateByUrl('login')
                    
          this.errorToast("Please Login")
        }
        this.Intalization();
    }

    editFunt(){
      
        this.editName = true
        this.editForm = false
    }
    Intalization(){
      this.getProfile();
      this.EditProfileForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        AddressLine1: ['', Validators.required],
        Country: ['', Validators.required],
        email: ['', Validators.required],
        Pin: ['', Validators.required],
        Bio: ['', Validators.required],
        Mobile_number: ['', Validators.required],
        Location: ['', Validators.required],
        // emverification_status_for_email: ['', Validators.required],
        
      })

      this.Edit_inter_Ext = this.formBuilder.group({
        ID : [''],
        Fullname : ['']
      })

      // this.Edit_Internal = this.formBuilder.group({
      //   ID : [''],
      //   fullname : ['']
      // })
      
      if( this.getDataFormLocal_fb!=null){
        this.Edit_inter_Ext.controls['Fullname'].setValue(this.getDataFormLocal_fb['fullName'])

      }else if(this.getDataFormLocal_local!=null){
        this.Edit_inter_Ext.controls['Fullname'].setValue(this.getDataFormLocal_local['FullName'])

      }

    }
  
    showSuccess(value) {
      this.toast.success(value);
          }
    
    errorToast(error){
      this.toast.error(error, '', {
        timeOut: 1000,
      });
    }



    async profileWithFb(){

    
    }

    async prologin(){

      if( this.getDataFormLocal_fb!=null){
      
        try{
          let obj = {
            Fullname :this.Edit_inter_Ext.value.Fullname.trim(),
            ID: this.getDataFormLocal_fb['id']
          }
          debugger
    if(obj.Fullname === "" || obj.Fullname=== null){
 
      this.errorToast('please Enter Same Value!')

    }else{


      let ProWithFb = await this.service.EditExtenalProfile(obj).toPromise();
      console.log(ProWithFb,'ProWithoutFb')
      // location.reload()

      this.router.navigateByUrl('/login');
        this.showSuccess('Update Successfully ! Please Re-login to see the update the name  ');

        localStorage.clear();
        setTimeout(() => {
          location.reload();

        }, 1000);


      this.Edit_inter_Ext.value.Fullname = '';
    }
     
        }catch(error){
          console.log(error);
        }
      }else if(this.getDataFormLocal_local!=null){
       
      try{
        // let formData = new FormData
        // formData.append('Fullname',this.Edit_inter_Ext.value.Fullname)
        // formData.append('ID',this.getDataFormLocal_local['Id'])
        console.log(this.Edit_inter_Ext.value)
        let obj_Edit = {
          Fullname :this.Edit_inter_Ext.value.Fullname.trim(),
          ID:this.getDataFormLocal_local['Id']
        }
        debugger

        if(obj_Edit.Fullname === "" || obj_Edit.Fullname === null  ){
          this.errorToast('please Enter Same Value!');
       
        }else{
          let ProWithoutFb = await this.service.EditInterProfile(obj_Edit).toPromise();
        console.log(ProWithoutFb,'ProWithoutFb');
        this.router.navigateByUrl('/login');
        this.showSuccess('Update Successfully ! Please Re-login to see the update the name  ');

        localStorage.clear();
        setTimeout(() => {
          location.reload();

        }, 1000);

        this.Edit_inter_Ext.value.Fullname = '';

        }
      }catch(error){
        console.log(error)
      }
      }



    } 
async getProfile(){
let loginLocalData = JSON.parse(localStorage.getItem('LoginResponse'))
      console.log(loginLocalData.Email);
  let getProfileDetail  =  await this.service.GetProfileDetails(loginLocalData.Email).toPromise();
  console.log(getProfileDetail.Username,"getProfileDetail")
  this.EditProfileForm.controls['username'].setValue(getProfileDetail.Username)
}


ProfileFormDataCall(){

  let ProFormData  = new FormData()

    //  ProFormData =    username,
     ProFormData.append('FistName',this.EditProfileForm.value.FistName)
     ProFormData.append('LastName',this.EditProfileForm.value.password),
     ProFormData.append('AddressLine1',this.EditProfileForm.value.password),

     ProFormData.append('AddressLine1',this.EditProfileForm.value.AddressLine1),

     ProFormData.append('Country',this.EditProfileForm.value.Country),

     ProFormData.append('email',this.EditProfileForm.value.email),

     ProFormData.append('Pin',this.EditProfileForm.value.Pin),

     ProFormData.append('Bio',this.EditProfileForm.value.Bio),

     ProFormData.append('Mobile_number',this.EditProfileForm.value.Mobile_number),
     ProFormData.append('Location',this.EditProfileForm.value.Location)


        // AddressLine1,
        // Country,
        // email,
        // Pin,
        // Bio,
        // Mobile_number,
        // Location,


}











async Submit_Profile(EditProfileData){
  let SbProfile = this.service.EditProfile(EditProfileData).toPromise()
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
            this.modalService.open(content,{ centered: true }).result.then((result) => {
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
            return  `with: ${reason}`;
        }
    }

    new_Add(){
      this.open_Adds=!this.open_Adds
      console.log(this.open_Adds)

    } 
    isRangeStart(date: NgbDate){
      return this.model1 && this.model2 && date.equals(this.model1);
    }
    isRangeEnd(date: NgbDate){
      return this.model1 && this.model2 && date.equals(this.model2);
    }
    isInRange(date: NgbDate){
      return date.after(this.model1) && date.before(this.model2);
    }
    isActive(date: NgbDate){
      return date.equals(this.model1) || date.equals(this.model2);
    }
    endDateChanged(date){
      if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
        this.model1 = this.model2;
      }
    }
    startDateChanged(date){
      if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
        this.model2 = this.model1;
      }
    }
//     get() {  
//       if (navigator.geolocation) {  
//           navigator.geolocation.getCurrentPosition((position: Position) => {  
//               if (position) {  
//                   this.lat = position.coords.latitude;  
//                   this.lng = position.coords.longitude;  
//                   this.getAddress = (this.lat, this.lng)  
//                   console.log(position)  
//                   this.apiloader.load().then(() => {  
//                       let geocoder = new google.maps.Geocoder;  
//                       let latlng = {  
//                           lat: this.lat,  
//                           lng: this.lng  
//                       };  
//                       geocoder.geocode({  
//                           'location': latlng  
//                       }, function(results) {  
//                           if (results[0]) {  
//                               this.currentLocation = results[0].formatted_address;  
//                               console.log(this.assgin);  
//                           } else {  
//                               console.log('Not found');  
//                           }  
//                       });  
//                   });  
//               }  
//           })  
//       }  
//   }   
//   mapClicked($event: MouseEvent) {  
//     this.latitude = $event.coords.lat,  
//         this.longitude = $event.coords.lng  
//     this.apiloader.load().then(() => {  
//         let geocoder = new google.maps.Geocoder;  
//         let latlng = {  
//             lat: this.latitude,  
//             lng: this.longitude  
//         };  
//         geocoder.geocode({  
//             'location': latlng  
//         }, function(results) {  
//             if (results[0]) {  
//                 this.currentLocation = results[0].formatted_address;  
//                 console.log(this.currentLocation);  
//             } else {  
//                 console.log('Not found');  
//             }  
//         });  
//     });  
// }


EditProfile(){
  this.openFile=! this.openFile
  console.log(this.openFile)
}
}
