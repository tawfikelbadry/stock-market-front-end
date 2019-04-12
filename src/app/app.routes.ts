import { SignupComponent } from './components/signup/signup.component';
import { Routes } from '@angular/router';

import { UpNavComponent } from './components/user-profile/up-nav/up-nav.component';
import { UpFindstockComponent } from './components/user-profile/up-findstock/up-findstock.component';
import { UpPrevprocessComponent } from './components/user-profile/up-prevprocess/up-prevprocess.component';
import { UpStockComponent } from './components/user-profile/up-stock/up-stock.component';
import { UpWatchComponent } from './components/user-profile/up-watch/up-watch.component';
import { UserprofileComponent } from './components/user-profile/userprofile.component';
import { UpPaymentComponent } from './components/user-profile/up-payment/up-payment.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CompanyComponent } from './components/company/company.component';
import { DetailNewComponent } from './components/detail-new/detail-new.component';
import { SignupCompanyComponent } from './components/signup-company/signup-company.component';
import { SignupUserComponent } from './components/signup-user/signup-user.component';
import { CompnyprofileComponent } from './components/compnyprofile/compnyprofile.component';
import { CompanySettingComponent } from './components/company-setting/company-setting.component';
import { SettingUserComponent } from './components/setting-user/setting-user.component';
import { AllnewsComponent } from './components/allnews/allnews.component';
import { AllstocksComponent } from './components/allstocks/allstocks.component';
import { UpOrdersComponent } from './components/user-profile/up-orders/up-orders.component';
import { UpOffersComponent } from './components/user-profile/up-offers/up-offers.component';
import { CompanyNewsComponent } from './components/company/company-news/company-news.component';
import { AdminComponent } from './components/admin/admin.component';


export const routes:Routes = [
   
    
   
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"signup",
        component:SignupComponent
    },
    {
        path:"signupcompany",
        component:SignupCompanyComponent
    },
    {
        path:"signupuser",
        component:SignupUserComponent
    },
    {
        path:"company",
        component:CompanyComponent,
    },
    {
        path:"company/news",
        component:CompanyNewsComponent
    },
    {
        path:"news-details/:id",
        component:DetailNewComponent
    },
    {
        path:"userprofile",
        component:UserprofileComponent,
        children :[
            {path:"my-stocks",component:UpStockComponent},
            {path:"find-stock",component:UpFindstockComponent},
            {path:"pyament",component:UpPaymentComponent},
            {path:"operations",component:UpPrevprocessComponent},
            {path:"watch-list",component:UpWatchComponent},
            {path:"orders",component:UpOrdersComponent},
            {path:'offers',component:UpOffersComponent}

        ]
    },
    {
        path:"companyprofile",
        component:CompnyprofileComponent
    },
    {
        path:"companyprofile/:id",
        component:CompnyprofileComponent
    },
    {
        path:"companysetting",
        component:CompanySettingComponent
    },
    {
        path:"usersetting",
        component:SettingUserComponent
    },    
    {
        path:"all-news",
        component:AllnewsComponent
    },
    {
        path:"stocks",
        component:AllstocksComponent
    },
    {
        path:"",
        component:HomepageComponent
    },{
        path:"admin",
        component:AdminComponent
    }
];