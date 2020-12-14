import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { End_Point, auth_Urls, urL } from 'src/constant';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public http: HttpClient) {

  }


  login_Call(loginForm_Value): Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.login}`, loginForm_Value);
  }


  registration_Call(registraionForm_Value): Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.Register}`, registraionForm_Value, { responseType: 'text' });

  }


  get_category(): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetAllCategory}`);

  }


  get_category_id(id): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetCategoryID}${id}`);

  }





  get_subcategory(id): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetSubCategory}${id}`,);

  }

  signout(): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${auth_Urls.SignOut}`);

  }


  resetPassword(email): Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.ForgetPasswordEmail}${email.
      
      username}`, {}, { responseType: 'text' });

  }

  NewPasswrord(token, data): Observable<any> {

    console.log(data)

    return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.ResetPassword}`,data, { 
      
      responseType: 'text' });

  }



  GetALLProduct(): Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.ProductALLProduct}`, {});
  }
  filterGetData(obj): Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.FilterResult}`, obj);
  }

  locationList(): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetLocationsList}`);
  }

  get_Token_newPassword(obj): Observable<any> {
    console.log(obj)

    return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.NewPassword}`, obj);

  }
    
  Add_Product(obj):Observable<any> {

    // return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.AddProduct}`, obj );
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.AddProduct}`, obj ,{ 
      
      responseType: 'text' } );

    // return this.http.post('https://classifiedwebapi.azurewebsites.net/api/Products/AddProduct?ProductTitle=Test&CategoryID=10&LocationName=in&MakeYear=2015&MaxPrice=45454&MinPrice=4354&Price=30000&ProductDescription=Test&SubCategoryID=30',{headers});
  }
  
      
  Get_brand_byID(subcategoryid):Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetAllbrandswithsubcategoryid}${subcategoryid}`,{} );
  }

  Get_Api_Year(): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GateMakeYears}`);
  }
  
  Get_Api_Model(): Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetAllProductModels}`,{});
  }

  
  get_search(userId ,keyWord): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${urL.Products}${auth_Urls.SearchProducts}${userId}${auth_Urls.Keywords}${keyWord}`);
  }



Admin_Analytics_searchKeyWord(keyWord):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.AdminAnalytics}${auth_Urls.AddSearchedKeyword}${keyWord}`);
}


VerifyOtpCall(number):Observable<any>{
  
  return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.VerifyMobileNumber}${number}`,{ 
      
    responseType: 'text' })
}


getCategoryTypeId():Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetAllCategoryTypes}`);
}

GetAllChildSubCategory():Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetAllChildSubCategory}`);
}


GetProfileDetails(username):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.User}${auth_Urls.GetProfileDetails}${username}` , {});
}

EditProfile(username):Observable<any>{

  return this.http.post(`${End_Point.server_Url}${urL.User}${auth_Urls.EditProfile}` , {});
}

getSerachThUser(Keywords):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Products}${auth_Urls.GetSearchHistory}${Keywords}`);
}


getExitenceRegis(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.User}${auth_Urls.GetExternalRegisterUser}${id}`,{ 
      
    responseType: 'text' });
}


EditExtenalProfile(obj):Observable<any>{

  return this.http.put(`${End_Point.server_Url}${urL.User}${auth_Urls.EditNameProfileExternal}` , obj,{ 
      
    responseType: 'text' });
}




RigExternal(obj):Observable<any>{

  return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.ExternalReg}` , obj,{ 
      
    responseType: 'text' });
}



// EditExtenalProfile(obj):Observable<any>{

//   return this.http.put(`${End_Point.server_Url}${urL.User}${auth_Urls.EditProfile}` , obj);
// }




EditInterProfile(obj):Observable<any>{

  return this.http.put(`${End_Point.server_Url}${urL.User}${auth_Urls.EditNameProfileInternal}` , obj,{ 
      
    responseType: 'text' });
}











}

