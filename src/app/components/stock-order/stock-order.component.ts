import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,Sort } from '@angular/material';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-stock-order',
  templateUrl: './stock-order.component.html',
  styleUrls: ['./stock-order.component.css']
})
export class StockOrderComponent implements  AfterViewInit ,OnInit {
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

  constructor(public dialog: MatDialog) {
    this.sortedData = this.stocks.slice();
  }
  
  openDialog(): void {
    let dialogRef = this.dialog.open(StockOrderBuy, {
      width: '550px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
    
  }

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
  ngOnInit() {
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
 

@Component({
  selector: 'stock-order-buy',
  templateUrl: 'stock-order-buy.html',
})
export class StockOrderBuy {

  constructor(
    public dialogRef: MatDialogRef<StockOrderBuy>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
