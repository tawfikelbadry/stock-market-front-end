import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, Sort } from '@angular/material';
import { CompaniesService } from '../../../services/companies.service';

@Component({
  selector: 'app-up-findstock',
  templateUrl: './up-findstock.component.html',
  styleUrls: ['./up-findstock.component.css']
})
export class UpFindstockComponent  implements  AfterViewInit ,OnInit {

  private searchResult:Array<any>;

  sortedData;
  constructor(public dialog: MatDialog,private companiesService:CompaniesService) {
    this.sortedData = this.stocks.slice(); 
  }

  ngOnInit() {
   this.getAllCompanies();
  }



  public searchCompanies(key){
    if(key===""){
      this.getAllCompanies();
    }else{
      this.companiesService.findCompanies(key).subscribe(
        res=>{
          this.searchResult=res;
        },error=>{
          console.log("error");
        }
      );
    }
  }

  getAllCompanies(){
    this.companiesService.getCompanies().subscribe(
      res=>{
        this.searchResult=res;
      }
    );
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
  stocks = [
    {name: 'اسم السهم',
    section: 'اسم القطاع',
    price: '6',
    changeRate: '24',
    changeValue: '19',
    low: '10',
    high:'100'
  },
  {name: 'ا سهم',
    section: 'البنوك',
    price: '9',
    changeRate: '37',
    changeValue: '20',
    low: '13',
    high:'20'
  },
    {name: 'ج سهم',
    section: 'قطاع المدارس',
    price: '16',
    changeRate: '24',
    changeValue: '13',
    low: '18',
    high:'33'
  },
    {name: 'سهم س',
    section: 'قطاع المستشفيات',
    price: '4',
    changeRate: '67',
    changeValue: '20',
    low: '5',
    high:'9'
  },
  ];

  
  
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogBuyStock, {
      width: '350px',
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
        case 'section': return compare(+a.section, +b.section, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        case 'changeRate': return compare(+a.changeRate, +b.changeRate, isAsc);
        case 'changeValue': return compare(+a.changeValue, +b.changeValue, isAsc);
        case 'low': return compare(+a.low, +b.low, isAsc);
        case 'high': return compare(+a.high, +b.high, isAsc);
        default: return 0;
      }
    });
  }
 

}


function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
 
//////////////////////////////////////////////////////////////////
@Component({
  selector: 'dialog-buy-stock',
  templateUrl: 'dialog-buy-stock.html',
})
export class DialogBuyStock {

  constructor(
    public dialogRef: MatDialogRef<DialogBuyStock>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
