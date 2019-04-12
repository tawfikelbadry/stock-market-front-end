import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import { TradingOrdersService } from '../../../services/trading-orders.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'up-orders',
    templateUrl: 'up-orders.component.html',
    styleUrls: ['up-orders.component.scss']
})
export class UpOrdersComponent implements  AfterViewInit ,OnInit {
    
    private allOrders:Array<any>;
    private sellOrders:Array<any>;
    private buyOrders:Array<any>;

    constructor(private tradingOrdersService:TradingOrdersService,public dialog: MatDialog){}
    
    ngOnInit() {
        this.getAllTradingOrders();
        this.getCurrentUserSellOrders();
        this.getCurrentUserBuyOrders();
    }
    
        
    getAllTradingOrders(){
        this.tradingOrdersService.getCurrentUserOrders().subscribe(
            res=>{
                this.allOrders=res;
            },error=>{
                console.log(error);
            }
        );
    }

    getCurrentUserSellOrders(){
        this.tradingOrdersService.getCurrentUserSellOrders().subscribe(
            res=>{
                this.sellOrders=res;
            },error=>{
                console.log(error);
            }
        );
    }

    getCurrentUserBuyOrders(){
        this.tradingOrdersService.getCurrentUserBuyOrders().subscribe(
            res=>{
                this.buyOrders=res;
            },error=>{
                console.log(error);
            }
        );
    }

    showConfirmDialog(orderId:number){
        console.log("Id : "+orderId);
        let dialogRef = this.dialog.open(RemoveOrder, {
            width: '350px',
            data: { orderID:orderId }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            this.getAllTradingOrders();
            this.getCurrentUserBuyOrders();
            this.getCurrentUserSellOrders();
        });
    }

    
    
    /////////////////////////////////////////////////////////////////////////////
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


@Component({
    selector: 'remove-order',
    templateUrl: 'remove-order.html',
  })
  export class RemoveOrder {
  
    isRemoved=false;
    constructor(
      public dialogRef: MatDialogRef<RemoveOrder>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private ordersService:TradingOrdersService) {
        this.isRemoved=false;
       }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    removeOrder(){
        this.ordersService.cancelOrder(this.data.orderID).subscribe(
            res=>{
                console.log(res);
            },error=>{
                console.log(error);
            }
        );
    }
  
   
  
  }
  