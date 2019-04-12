import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, Input } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {Headers, HttpModule} from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatTooltipModule,
  MatCheckboxModule,
  MatRadioModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatSortModule,
  MatSnackBarModule,
  MatTabsModule,
  MatPaginatorModule,
  MatSelectModule,
  MatIconModule,
  MatNativeDateModule,
  MatToolbarModule,
  
} from '@angular/material';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/includes/navbar/navbar.component';
import { FooterComponent } from './components/includes/footer/footer.component';
import { HeadComponent } from './components/includes/head/head.component';
import { ScriptComponent } from './components/includes/script/script.component';
import { UserprofileComponent } from './components/user-profile/userprofile.component';
import { UpNavComponent } from './components/user-profile/up-nav/up-nav.component';
import { UpStockComponent,DialogSellStock,DialogBuyStock2 } from './components/user-profile/up-stock/up-stock.component';
import { UpWatchComponent } from './components/user-profile/up-watch/up-watch.component';
import { UpPrevprocessComponent } from './components/user-profile/up-prevprocess/up-prevprocess.component';
import { UpFindstockComponent, DialogBuyStock } from './components/user-profile/up-findstock/up-findstock.component';
import { UpBlogComponent } from './components/user-profile/up-blog/up-blog.component';
import { RouterModule } from '@angular/router';
import { DialogComponent, DialogOverviewExampleDialog } from './components/dialog/dialog.component';
import { CompnyprofileComponent,DialogBuyStock3 } from './components/compnyprofile/compnyprofile.component';
import { UpPaymentComponent } from './components/user-profile/up-payment/up-payment.component';
import { StockOrderComponent, StockOrderBuy } from './components/stock-order/stock-order.component';
import { DetailNewComponent } from './components/detail-new/detail-new.component';
import { LoginComponent } from './components/login/login.component';
import { CompanySettingComponent, PizzaPartyComponent } from './components/company-setting/company-setting.component';
import { CompanyComponent } from './components/company/company.component';
import { SignupCompanyComponent } from './components/signup-company/signup-company.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SettingUserComponent, PizzaParty2Component } from './components/setting-user/setting-user.component';
import { SignupUserComponent } from './components/signup-user/signup-user.component';
import { SignupComponent } from './components/signup/signup.component';
import { AllnewsComponent } from './components/allnews/allnews.component';
import { AllstocksComponent } from './components/allstocks/allstocks.component';
import { HttpClientModule } from '@angular/common/http';
import { SectorsService } from './services/sectors.service';
import { CompaniesService } from './services/companies.service';
import { LoginService } from './services/login.service';
import { NormalUserService } from './services/normal-user.service';
import { UserService } from './services/user.service';
import { UserStocksService } from './services/user-stocks.service';
import { UserOperationsService } from './services/user-operations.service';
import { NewsService } from './services/news.service';
import { CommonModule } from '@angular/common';
import { UpOrdersComponent, RemoveOrder } from './components/user-profile/up-orders/up-orders.component';
import { StockService } from './services/stock.service';
import { TradingOrdersService } from './services/trading-orders.service';
import { UpOffersComponent } from './components/user-profile/up-offers/up-offers.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { GooglePieChartService } from './services/charts/google-pie-chart.service';
import { DashboardComponent } from './components/charts/dashboard/dashboard.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { GoogleLineChartService } from './services/charts/google-line-chart.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CompanyNewsComponent, EditNews, RemoveNews } from './components/company/company-news/company-news.component';
import { UploadImageService } from './services/upload-image.service';
import { AdminComponent } from './components/admin/admin.component';
import { AdminNavBarComponent } from './components/admin/nav-bar/nav-bar.component';
import { CompanyListComponent } from './components/admin/companiesList/company-list.component';
import { AdminService } from './services/admin.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeadComponent,
    ScriptComponent,
    UserprofileComponent,
    UpNavComponent,
    UpStockComponent,
    UpWatchComponent,
    UpPrevprocessComponent,
    UpFindstockComponent,
    UpBlogComponent,
    DialogOverviewExampleDialog,
    StockOrderBuy,
    DialogBuyStock,
    DialogSellStock,
    DialogBuyStock2,
    DialogBuyStock3,
    DialogComponent,
    CompnyprofileComponent,
    UpPaymentComponent,
    StockOrderComponent,
    DetailNewComponent,
    LoginComponent,
    SignupUserComponent,
    CompanySettingComponent,
    CompanyComponent,
    SignupCompanyComponent,
    HomepageComponent,
    SettingUserComponent,
    SignupComponent,
    AllnewsComponent,
    AllstocksComponent,
    UpOrdersComponent,
    UpOffersComponent,
    PieChartComponent,
    DashboardComponent,
    LineChartComponent,
    AdminNavBarComponent,
    CompanyListComponent,
    CompanyNewsComponent,EditNews,RemoveNews,RemoveOrder,
    PizzaPartyComponent,PizzaParty2Component, AdminComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatExpansionModule,
    MatSliderModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSortModule,
    MatSnackBarModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    HttpModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatToolbarModule
   
  ],
  providers: [SectorsService,CompaniesService,LoginService,NormalUserService,UserService,UserStocksService,
  UserOperationsService,NewsService,StockService,TradingOrdersService,GooglePieChartService,GooglePieChartService,
  GoogleLineChartService,UploadImageService,AdminService],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog, DialogBuyStock,StockOrderBuy,DialogSellStock,DialogBuyStock3,DialogBuyStock2,
    EditNews, RemoveNews,RemoveOrder,PizzaPartyComponent,PizzaParty2Component
  ]
})
export class AppModule { }
