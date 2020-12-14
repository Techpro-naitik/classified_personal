export enum End_Point {

    server_Url= 'https://classifiedwebapi.azurewebsites.net/api/'
}

export enum urL {

    Admin = 'Admin/',
    Authentication ='Authentication/',
    Products = 'Products/',
    AdminAnalytics = 'AdminAnalytics/',
    User = 'User/'

}

export enum auth_Urls {
    login = 'login',
    Register='Register',
    GetAllCategory = 'GetAllCategory',
    GetSubCategory = 'GetSubCategoriesOfCategory?CategoryID=',
    SignOut = 'SignOut',
    ForgetPasswordEmail ='ForgetPassword?username=',
    ResetPasswordUsername = 'ResetPassword?username=',
    getPasswordResetTokenEmail = 'getPasswordResetToken?email=',
    GetProfileDetailsUsername = 'GetProfileDetails?username=',
    GetCategoryID = 'GetCategory?id=',
    ResetPassword = 'ResetPassword',
    previousPassword = '&previouspassword=',
    newPassword= '&newpassword=',
    ProductALLProduct ="GetAllProducts",
    FilterResult = 'FilterResult',
    GetLocationsList = 'GetLocationsList',
    NewPassword = 'NewPassword',
    AddProduct = 'AddProduct',
    GetAllbrands = 'GetAllbrands',
    GetAllbrandswithsubcategoryid='GetAllbrandswithsubcategoryid?subcategoryid=',
    GateMakeYears = 'GateMakeYears',
    GetAllProductModels = 'GetAllProductModels',
    SearchProducts = 'SearchProducts?userid=',
    Keywords ='&Keywords=',
    AddSearchedKeyword = 'AddSearchedKeyword?keyword=',
    VerifyMobileNumber ='VerifyMobileNumber?number=',
    GetAllCategoryTypes = 'GetAllCategoryTypes',
    GetAllChildSubCategory = 'GetAllChildSubCategory',
    GetProfileDetails= 'GetProfileDetails?username=',
    EditProfile =  'EditProfile',
    GetSearchHistory ='GetSearchHistory?userid='   ,
    EditProfileExternal = 'EditProfileExternal'  ,
    GetExternalRegisterUser = 'GetExternalRegisterUser?ID=',
    EditNameProfileExternal = 'EditNameProfileExternal',
    EditNameProfileInternal ='EditNameProfileInternal',
    ExternalReg =  'ExternalRegistartion'
    
}

            