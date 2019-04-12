import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, Sort } from '@angular/material';

import { CompaniesService } from '../../services/companies.service';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { NormalUserService } from '../../services/normal-user.service';
import { TradingOrder } from '../../model/trading-order';
import { TradingOrdersService } from '../../services/trading-orders.service';

import * as Chart from 'chart.js';
import { LoginService } from '../../services/login.service';
import { ServerPath } from '../../constants/app-const';
import { UserService } from '../../services/user.service';
import { UserStocksService } from '../../services/user-stocks.service';

// declare var google: any;

@Component({
  selector: 'app-compnyprofile',
  templateUrl: './compnyprofile.component.html',
  styleUrls: ['./compnyprofile.component.css']
})
export class CompnyprofileComponent implements  AfterViewInit ,OnInit {
 
  company:any;
  imageUrl=ServerPath+"/api/companies/image/";

  lineChart:any;

  isFollowing:boolean=false;

  private isCompanyLogged=false;
  private isTraderLogged=false;

  private stockUsers:Array<any>;

  private isLine:boolean=false;

  constructor(private companiesService:CompaniesService,
              private stockService:StockService,
              private route:ActivatedRoute,
              public dialog: MatDialog,
              private normalUserService:NormalUserService,
              private loginService:LoginService,
              private userService:UserService,
              private userStockService:UserStocksService) {
    
    this.sortedData = this.stocks.slice();
  }



  ngOnInit() {
    this.getCompanyById();  
    this.checkIsLoggedCompany();
    this.checkIsLoggedTrader();
    // this.google.charts.load('current', {packages: ['corechart', 'line']});
    // this.google.charts.setOnLoadCallback(this.drawBasicLine());
    
  }

  showLineChart(){
    this.drawLineChartForStock(this.company.stock.id);
    this.isLine=false;
  }

  showBarChart(){
    this.drawBarChartForStock(this.company.stock.id);
    this.isLine=true;
  }

  changeFollowStatus(){
    this.isFollowing=!this.isFollowing;
  }

  checkIsUserFollowingCompany(companyId){
    this.normalUserService.checkFollowing(companyId).subscribe(
      res=>{
        this.isFollowing=res['isFollow'];
      }
    );
  }

  drawBarChartForStock(stockId:number){
    let dateLabels:Array<Date>=new Array();
    let dataStockPrices:Array<any>=new Array();

    let stockPrices:Array<any>;
    
    this.stockService.getStockPricesById(stockId).subscribe(
      res=>{
        stockPrices=res;

        for(let l=0;l<stockPrices.length;l++){
          dateLabels[l]=stockPrices[l]['date'];
        
          dataStockPrices[l]={
            t:stockPrices[l]['date'],
            y:stockPrices[l]['latestPrice']
          }
        }

        this.lineChart=new Chart('barChart',{
          type:'bar',
          data:{
          labels: dateLabels,
          datasets: [{
            label: 'Stock prices',
            data: dataStockPrices,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      }
          }
         );

      },error=>{
        console.log("error : "+error);
      }
    );

        
  }

  drawLineChartForStock(stockId:number){
    let dateLabels:Array<Date>=new Array();
    let dataStockPrices:Array<any>=new Array();

    let stockPrices:Array<any>;
    
    this.stockService.getStockPricesById(stockId).subscribe(
      res=>{
        stockPrices=res;

        for(let l=0;l<stockPrices.length;l++){
          dateLabels[l]=stockPrices[l]['date'];
        
          dataStockPrices[l]={
            t:stockPrices[l]['date'],
            y:stockPrices[l]['latestPrice']
          }
        }

        this.lineChart=new Chart('lineChart',{
          type:'line',
          data:{
          labels: dateLabels,
          datasets: [{
            label: 'Stock prices',
            data: dataStockPrices,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      }
          }
         );

      },error=>{
        console.log("error : "+error);
      }
    );

        
  }

  checkIsLogged(){
    return this.loginService.checkCredential();
  }

  checkIsLoggedCompany(){
    let isLogged= this.loginService.checkCredential();
    if(isLogged){
    this.userService.getCurrentUserRoles().subscribe(
      res=>{
        if(res[0].authority=="ROLE_COMPANY"){
          this.isCompanyLogged= true;
        }else {   
          this.isCompanyLogged= false;
        }
      }
    );
    }else{
      this.isCompanyLogged= false;
    }
  }


  checkIsLoggedTrader(){
    let isLogged= this.loginService.checkCredential();
    if(isLogged){
    this.userService.getCurrentUserRoles().subscribe(
      res=>{
        if(res[0].authority=="ROLE_USER"){
          this.isTraderLogged= true;
        }else {   
          this.isTraderLogged= false;
        }
      }
    );
    }else{
      this.isTraderLogged= false;
    }
  }

  getCompanyById(){
    if(this.route.snapshot.params['id']==null){
      this.companiesService.getLoggedCompany().subscribe(
        res=>{
          this.company=res;
          this.imageUrl+=this.company.id;
          this.drawLineChartForStock(this.company.stock.id);
          this.getCompanyUsers(this.company.stock.id);
        }
      );
    }else{
    let companyId=this.route.snapshot.params['id'];
    this.companiesService.getCompany(companyId).subscribe(
      res=>{
        this.company=res;
        if(this.loginService.checkCredential()){
          this.checkIsUserFollowingCompany(this.company.id);
        }

        this.drawLineChartForStock(this.company.stock.id);
        this.getCompanyUsers(this.company.stock.id);
        this.imageUrl+=companyId;
      },
      error=>{
        console.log(error);
      }
    );
  }
  }

  getCompanyUsers(stockId:number){
    this.userStockService.getStockUsersById(stockId).subscribe(
      res=>{
        this.stockUsers=res;
      }
    );
  }

  followCompany(){
    this.normalUserService.followCompany(this.company.id).subscribe(
      res=>{
        if(res['result']==1){
          this.isFollowing=true;
        }
      }
    );
  }

  unfollowCompany(){
    this.normalUserService.unfollowCompany(this.company.id).subscribe(
      res=>{
        if(res['result']==1){
            this.isFollowing=false;
        }
      }
    );
    
  }

  
  /////////////// abdelhameed code  /////////////////
  openDialog(stockId): void {
    let dialogRef = this.dialog.open(DialogBuyStock3, {
      width: '350px',
      data: { "stockId":stockId }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  stocks = [
    {name: 'احمد ', amount: '20', precentage: '6%'},
    {name: 'عبد الحميد ', amount: '15', precentage: '9%'},
    {name: ' محمد', amount: '30', precentage: '16%'},
  ];

  sortedData;



  sortData(sort: Sort) {
    const data = this.stocks.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'amount': return compare(+a.amount, +b.amount, isAsc);
        case 'precentage': return compare(+a.precentage, +b.precentage, isAsc);
        default: return 0;
      }
    });
  }

  async ngAfterViewInit() {
    await this.loadScript('./assets/vendor/jquery/jquery.js');
    await this.loadScript('./assets/vendor/bootstrap/js/bootstrap.js');
    await this.loadScript('./assets/vendor/font-awesome/fontawesome-all.min.js');
    await this.loadScript('./assets/vendor/nicescroll/jquery.nicescroll.min.js');
    await this.loadScript('./assets/vendor/slick/slick.min.js');
    await this.loadScript('./assets/js/app.js');
  
    }
    private loadScript(scriptUrl: string) {
      return new Promise((resolve, reject) => {
          const scriptElement = document.createElement('script')
          scriptElement.src = scriptUrl
          scriptElement.onload = resolve
          document.body.appendChild(scriptElement)
      })
    }
 
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
 
////////////////  Model component  //////////////////////// 
@Component({
  selector: 'dialog-buy-stocks',
  templateUrl: 'dialog-buy-stocks.html',
  styleUrls: ['./compnyprofile.component.css']
})
export class DialogBuyStock3 implements OnInit{

  private stockName="";
  private stockPrice:number;
  private currentUserMoney:number;

  private totalPrice:number;

  private order:TradingOrder=new TradingOrder();


  private isOrderDone=false;
  private isHaveEnoughMoney=true;

  constructor(
              public dialogRef: MatDialogRef<DialogBuyStock3>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private stockService:StockService,
              private normalUserService:NormalUserService,
              private tradingOrderService:TradingOrdersService
              ) { }


sendBuyOrder(){
  this.order.type="BUY";
  this.order.stock.id=this.data.stockId;
  if(this.totalPrice>this.currentUserMoney){

  this.isHaveEnoughMoney=false;
 
  }else{
    this.isHaveEnoughMoney=true;
    this.tradingOrderService.sendOrder(this.order).subscribe(
      res=>{
          let orderId=res["id"];
          if(orderId>0){
            this.isOrderDone=true;
          }
      },error=>{
        this.isOrderDone=false;
      }
    );
  }

  console.log(this.order);

}

  
ngOnInit(): void {
  this.isOrderDone=false;

  this.stockService.getStockNameById(this.data.stockId).subscribe(
    res=>{
      this.stockName=res['companyName'];
    }
  );

  this.stockService.getStockPriceById(this.data.stockId).subscribe(
    res=>{
      this.stockPrice=res['companyprice'];
    }
  );

  this.normalUserService.getCurrentUserTotalMoney().subscribe(
    res=>{
      this.currentUserMoney=res['totalMoney'];
    }
  );
  this.normalUserService.getCurrentUserId().subscribe(
    res=>{
      this.order.user.id=res['CurrentuserId'];
    }
  );

}



calcTotalPrice(){
  if( this.order.count > 0 && this.order.wantedPrice > 0 ){
    this.totalPrice=this.order.count*this.order.wantedPrice;
  }
}
  


onNoClick(): void {
  this.dialogRef.close();
}



}
