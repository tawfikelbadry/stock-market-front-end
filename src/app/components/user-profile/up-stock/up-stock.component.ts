import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, Sort } from '@angular/material';


import { UserStocksService } from '../../../services/user-stocks.service';
import { UserStock } from '../../../model/user-stock';
import { StockService } from '../../../services/stock.service';
import { NormalUserService } from '../../../services/normal-user.service';
import { TradingOrdersService } from '../../../services/trading-orders.service';
import { TradingOrder } from '../../../model/trading-order';


@Component({
  selector: 'app-up-stock',
  templateUrl: './up-stock.component.html',
  styleUrls: ['./up-stock.component.css']
})
export class UpStockComponent implements  AfterViewInit ,OnInit {

  private currentuserStocks:Array<UserStock>;

  constructor(private userStockService:UserStocksService,public dialog: MatDialog) {
    this.sortedData = this.stocks.slice();
  }
  
  ngOnInit() {
    this.getUserStocks();
  }

  // method for open model for send sell order 
  openDialogSell(stockId:number): void {
    let dialogRef = this.dialog.open(DialogSellStock, {
      width: '350px',
      data: {"stockId":stockId }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  // method for open model for send buy order 
  openDialogBuy(stockId:number): void {
    let dialogRef = this.dialog.open(DialogBuyStock2, {
      width: '350px',
      data: {"stockId":stockId }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }


  getUserStocks(){
    this.userStockService.getCurrentUserStocks().subscribe(
      res=>{
        this.currentuserStocks=res;
        console.log(this.currentuserStocks);
      },error=>{

      }
    );
  }













//////////////////////////////////////////////////////////////////////////////////////////////

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
  stocks = [
    {name: 'اسم السهم', amount: '20', price: '6', buy: '24'},
    {name: 'ا سهم', amount: '15', price: '9', buy: '37'},
    {name: 'ج سهم', amount: '30', price: '16', buy: '24'},
    {name: 'سهم س', amount: '50', price: '4', buy: '67'},
    {name: 'سهم ص', amount: '100', price: '16', buy: '49'},
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
        case 'price': return compare(+a.price, +b.price, isAsc);
        case 'buy': return compare(+a.buy, +b.buy, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
 

@Component({
  selector: 'dialog-buy-stock',
  templateUrl: 'dialog-buy-stock.html',
  styleUrls: ['./up-stock.component.css']

})
export class DialogBuyStock2 {

  constructor(
    public dialogRef: MatDialogRef<DialogBuyStock2>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-sell-stock',
  templateUrl: 'dialog-sell-stock.html',
  styleUrls: ['./up-stock.component.css']
})
export class DialogSellStock implements OnInit {

  private stockName="";
  private stockPrice:number;

  private totalPrice:number;
  private currentUserStockquantity;

  private order:TradingOrder=new TradingOrder();


  private isOrderDone=false;


  constructor(
            public dialogRef: MatDialogRef<DialogSellStock>,
            @Inject(MAT_DIALOG_DATA) public data: any,
            private stockService:StockService,
            private normalUserService:NormalUserService,
            private tradingOrderService:TradingOrdersService,
            private userStocksService:UserStocksService
            ) { }

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
  
    this.normalUserService.getCurrentUserId().subscribe(
      res=>{
        this.order.user.id=res['CurrentuserId'];
      }
    );

    this.userStocksService.getCurrentUserStockQuantitybyStockId(this.data.stockId).subscribe(
      res=>{
        this.currentUserStockquantity=res['UserStockquantity'];
      }
    );

    
  
  }

  sendSellOrder(){
    this.order.type="SELL";
    this.order.stock.id=this.data.stockId;
   
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
    
  
    console.log(this.order);
  
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