import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-tabs-section',
  templateUrl: './tabs-section.component.html',
  styleUrls: ['./tabs-section.component.css']
})
export class TabsSectionComponent implements OnInit {
  page = 2;
  page1 = 3;
  responseApplyFilters = [];

  subCategory = [];
  categoryAPiData: any | [];
  getSubCategoryResponse: any | [];
  responseFrom_get_categoryApi: any | [];
  GetProdt: any | [];
  rangePriceValue: any | [];
  selectedValueCategory: any | [];
  yearValue: any;
  get_Product: any;
  getFilterProduct: any;
  get_Location: any | [];
  s1: boolean = false;
  s2: boolean = true;
  s3: boolean = true;
  locatonValue: any | [];


  keyword = 'Keyword';
  keyword_KeyWord = 'LocationName';
  data = [
    {
      id: 1,
      name_: 'Dakota Gaylord PhD',
      address: '14554 Smith Mews'
    },
    {
      id: 2,
      name_: 'Maria Legros',
      address: '002 Pagac Drives'
    },
    {
      id: 3,
      name_: 'Brandyn Fritsch',
      address: '8542 Lowe Mountain'
    },
    {
      id: 4,
      name_: 'Glenna Ward V',
      address: '1260 Oda Summit'
    },
    {
      id: 5,
      name_: 'Jamie Veum',
      address: '5017 Lowe Route'
    }
  ];

  PostData: any;
  sortBy: any;
  get_Year: Promise<any>;
  items = [];
  pageOfItems: Array<any>;
  public staticUserIds;
  public Ids;
  getDataFormLocal_local: any;
  getDataFormLocal_gmail: any;
  getDataFormLocal_fb: any;
  responseFrom_get_Keyword: any;
  ValueGloubal: string;
  constructor(
    public router: Router,
    public service: ServiceService,
    private toast: ToastrService,
    private ngxService: NgxUiLoaderService,


  ) {
  }
  ngOnInit() {



    this.getDataFormLocal_local = JSON.parse(localStorage.getItem('LoginResponse'))
    this.getDataFormLocal_gmail = JSON.parse(localStorage.getItem('gmailLogin'))
    this.getDataFormLocal_fb = JSON.parse(localStorage.getItem('fbLogin'))



    this.getAllProduct()
    this.getAll_category();
    this.myYear()
    this.gettSearch()
  }


  showSuccess() {
    this.toast.success('Register Successfully', '');
  }

  errorToast(error) {
    this.toast.error(error, '', {
      timeOut: 3000,
    });
  }
  onChangePage(pageOfItems: Array<any>) {

    // update current page of items
    this.pageOfItems = pageOfItems;
    console.log(this.pageOfItems, "pageOfItems")
  }
  async categorySelect(value, id) {
    debugger
console.log( this.ValueGloubal )
console.log(id)
    if (this.getDataFormLocal_local != null) {
      console.log(this.getDataFormLocal_local.Id)


      this.s1 = true
      this.s2 = true
      this.s3 = false
      console.log(this.staticUserIds)
      console.log(this.Ids)
      try {
        this.ngxService.start();

        let cID;
        if (id !== undefined && this.ValueGloubal !== undefined) {
          this.subCategory = await this.service.get_subcategory(0).toPromise();
          console.log(this.subCategory)


          let category: any = this.categoryAPiData.filter(ele => ele.CategoryName == this.ValueGloubal);
          category.forEach(element => {
            cID = element.CategoryId
          });

          this.getSubCategoryResponse = this.subCategory.filter(ele => ele.CategoryId === cID);
          console.log(this.getSubCategoryResponse);


          let searchKeyWord = await this.service.Admin_Analytics_searchKeyWord(this.ValueGloubal).toPromise();
          console.log(searchKeyWord);


          let searchKeyWord_Admin = await this.service.get_search(this.getDataFormLocal_local.Id, this.ValueGloubal ).toPromise();
          console.log(searchKeyWord_Admin);

          let countryID = this.get_Location.filter(ele => ele.LoactionID === id);
          console.log(countryID)
          this.staticUserIds = '';
          this.Ids = ''

          this.ngxService.stop();


        } else {
          this.errorToast('please Enter some value')
          this.ngxService.stop();

        }

      } catch (err) {
        console.log(err)
        this.ngxService.stop();

      }

    } else if (this.getDataFormLocal_fb != null) {
      console.log(this.getDataFormLocal_fb.id)




      this.s1 = true
      this.s2 = true
      this.s3 = false
      console.log(this.staticUserIds)
      console.log(this.Ids)
      try {
        this.ngxService.start();

        let cID;
        if (id !== undefined && this.ValueGloubal !== undefined) {
          this.subCategory = await this.service.get_subcategory(0).toPromise();
          console.log(this.subCategory)


          let category: any = this.categoryAPiData.filter(ele => ele.CategoryName == this.ValueGloubal);
          category.forEach(element => {
            cID = element.CategoryId
          });

          this.getSubCategoryResponse = this.subCategory.filter(ele => ele.CategoryId === cID);
          console.log(this.getSubCategoryResponse);


          let searchKeyWord = await this.service.Admin_Analytics_searchKeyWord(this.ValueGloubal).toPromise();
          console.log(searchKeyWord);


          let searchKeyWord_Admin = await this.service.get_search(this.getDataFormLocal_fb.id,this.ValueGloubal).toPromise();
          console.log(searchKeyWord_Admin);

          let countryID = this.get_Location.filter(ele => ele.LoactionID === id);
          console.log(countryID)
          this.staticUserIds = '';
          this.Ids = ''

          this.ngxService.stop();


        } else {
          this.errorToast('please Enter some value')
          this.ngxService.stop();

        }

      } catch (err) {
        console.log(err)
        this.ngxService.stop();

      }
    } else {


      this.s1 = true
      this.s2 = true
      this.s3 = false
      console.log(this.staticUserIds)
      console.log(this.Ids)
      try {
        this.ngxService.start();

        let cID;
        if (id !== undefined &&  this.ValueGloubal !== undefined) {
          this.subCategory = await this.service.get_subcategory(0).toPromise();
          console.log(this.subCategory)


          let category: any = this.categoryAPiData.filter(ele => ele.CategoryName == this.ValueGloubal);
          category.forEach(element => {
            cID = element.CategoryId
          });

          this.getSubCategoryResponse = this.subCategory.filter(ele => ele.CategoryId === cID);
          console.log(this.getSubCategoryResponse);


          let searchKeyWord = await this.service.Admin_Analytics_searchKeyWord(this.ValueGloubal).toPromise();
          console.log(searchKeyWord);


          let searchKeyWord_Admin = await this.service.get_search(0,this.ValueGloubal).toPromise();
          console.log(searchKeyWord_Admin);

          let countryID = this.get_Location.filter(ele => ele.LoactionID === id);
          console.log(countryID)
          this.staticUserIds = '';
          this.Ids = ''

          this.ngxService.stop();


        } else {
          this.errorToast('please Enter some value')
          this.ngxService.stop();

        }

      } catch (err) {
        console.log(err)
        this.ngxService.stop();

      }
    }






  }




  async gettSearch(){ 
    
    if (this.getDataFormLocal_local != null) {
      this.responseFrom_get_Keyword = await this.service.getSerachThUser(this.getDataFormLocal_local.Id).toPromise();
      console.log(this.responseFrom_get_Keyword, "responseFrom_get_Keyword");


    }else if(this.getDataFormLocal_fb != null){

    console.log(this.getDataFormLocal_fb.id)
        this.responseFrom_get_Keyword = await this.service.getSerachThUser(this.getDataFormLocal_fb.id).toPromise();
      console.log(this.responseFrom_get_Keyword, "responseFrom_get_Keyword");
    }







  
    
  }
  

  async getAll_category() {


    try {
      this.ngxService.start();

      this.responseFrom_get_categoryApi = await this.service.get_category().toPromise();
      console.log(this.responseFrom_get_categoryApi, "categoryApi");
      // this.items = this.responseFrom_get_categoryApi;
          this.gettSearch()
        // console.log(this.items)




      this.getLocation()
      this.categoryAPiData = this.responseFrom_get_categoryApi
      this.subCategory = await this.service.get_subcategory(0).toPromise();
      this.items = this.subCategory
      console.log(this.items)
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.ngxService.stop();
      }, 2000);

    } catch (error) {
      console.log(error)
    }
  }

  detailPage() {
    this.router.navigateByUrl('/dPage')
    this.ngxService.stop();

  }


  selectLocation(value) {
    console.log(value)
  }



  async bindValue(id) {

    console.log(id)
    try {
      this.subCategory = await this.service.get_subcategory(id).toPromise();
      console.log(this.subCategory)

    } catch (err) {
      console.log(err)
    }


  }


  async getLocation() {
    this.get_Location = await this.service.locationList().toPromise();
  }



  navigation(value) {
    console.log(value)
    this.router.navigate(['/dPage']);
    localStorage.setItem('id', value)
  }

  async getAllProduct() {
    this.get_Product = await this.service.GetALLProduct().toPromise();
  }

  async FilterProduct(data) {
    this.getFilterProduct = await this.service.filterGetData(data).toPromise();
  }

  save_range(value) {
    console.log(value)
    this.rangePriceValue = value


  }




  selectEvent(item) {
    // do something with selected item
    console.log(item)

  }

  onChangeSearch(val: string) {
    console.log(val)

    this.ValueGloubal = val
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    console.log(e)
    // do something when input is focused
  }







  async myYear() {
    try {
      this.get_Year = await this.service.Get_Api_Year().toPromise();
      console.log(this.get_Year)
    } catch (error) {
      console.log(error)
    }
  }


  onOptionsSelected(value) {
    this.selectedValueCategory = value
    console.log("the selected value is " + value);
  }
  YearDroupDown(value) {
    this.yearValue = value
    console.log("the selected value is " + value);
  }

  mylocationDroupDown(location) {
    this.locatonValue = location
  }

  myPostLocal(myPostDate) {
    this.PostData = myPostDate
  }

  mySortLocal(mySort) {
    // console.log(mySort)
    this.sortBy = mySort
  }
  async applyFilter() {
    this.s1 = true
    this.s2 = false
    this.s3 = true
    console.log(this.s2)
    this.subCategory == null;
    let lYear;
    let lprice;
    let lSelectedCategory;
    let LlocatonValue;

    if (this.yearValue === undefined) {
      lYear = ""
    } else {
      lYear = this.yearValue
    }
    if (this.rangePriceValue === undefined) {
      lprice = 0
    } else {
      lprice = this.rangePriceValue;
    }

    if (this.selectedValueCategory === undefined) {
      lSelectedCategory = 0
    } else {
      lSelectedCategory = parseInt(this.selectedValueCategory)
    }

    if (this.locatonValue === undefined) {
      LlocatonValue = 0
    } else {
      LlocatonValue = parseInt(this.locatonValue);
    }

    // if (this.locatonValue === undefined) {
    //   LlocatonValue = 0
    // } else {
    //   LlocatonValue = parseInt(this.locatonValue);
    // }

    // if (this.locatonValue === undefined) {
    //   LlocatonValue = 0
    // } else {
    //   LlocatonValue = parseInt(this.locatonValue);
    // }



    let applyLocalFilter = {
      "categoryId": lSelectedCategory,
      "subcategoryId": 0,
      "locationId": LlocatonValue,
      "makeYear": lYear,
      "minMileage": 0,
      "maxMileage": 0,
      "brandID": 0,
      "modelID": 0,
      "typeID": 0,
      "price": lprice,
      "minpriceRange": 0,
      "maxpriceRange": 0,
      "priceType": 0,
      "productCondition": 0,
      "begningYear": "",
      "endYear": "",
      "sortby": parseInt(this.sortBy),
      "postedWithin": parseInt(this.PostData)

    }

    console.log(applyLocalFilter)

    try {

      this.ngxService.start()
      this.responseApplyFilters = await this.service.filterGetData(applyLocalFilter).toPromise();
      console.log(this.responseApplyFilters)
      this.ngxService.stop();
    } catch (error) {
      this.ngxService.stop();

      console.log(error)

    }

  }

  // get_Search_By_Api() {
  //   try {
  //     let get_Data_By_Search = this.service.get_search().toPromise();
  //     console.log(get_Data_By_Search)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

}
