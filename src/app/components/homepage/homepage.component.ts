import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, Sort } from '@angular/material';
import { CompaniesService } from '../../services/companies.service';
import { News } from '../../model/news';
import { NewsService } from '../../services/news.service';
import { ServerPath } from '../../constants/app-const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements  AfterViewInit ,OnInit {

  topNews:News;
  top6_1News:Array<News>;
  imageLink:string=ServerPath+"/api/news/image/";

  topCompaniesSet:Array<any>;


  constructor(
              public dialog: MatDialog,
              private companiesService:CompaniesService,
              private newsService:NewsService,
              private router:Router
              ) {
    this.sortedData = this.stocks.slice(); 
  }

  ngOnInit() {
    this.getTop10CompaniesWithTradingVolume();
    this.getLatestNews();
    this.getTop6_1News();
   
  }


  getTop10CompaniesWithTradingVolume(){
    this.companiesService.getTop10CompaniesTradingVolume().subscribe(
      res=>{
        this.topCompaniesSet=res;
      },error=>{
        console.log(error)
      }
    );
  }

  getTop6_1News(){
    this.newsService.getTop6_1News().subscribe(
      res=>{
        this.top6_1News=res;
        for(let x=0;x<this.top6_1News.length;x++){
          console.log("ID : "+this.top6_1News[x].id);
         this.top6_1News[x].imageLink=this.imageLink+""+this.top6_1News[x].id;
        }
      },error=>{
        console.log(error);
      }
    );
  }

  getLatestNews(){
    return this.newsService.getTopNews().subscribe(
      res=>{
        this.topNews=res;
        this.topNews.imageLink=this.imageLink+""+this.topNews.id;

      },error=>{
          console.log(error);
      }
    );
  }


  showNewsDetails(newsId:number){
    this.router.navigate(['/news-details',newsId]);
    window.scrollTo(0,0);

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
    {name: 'اسم الشركه',
    number: '55',
    price: '6',
    low: '10',
    high:'100',
    open: '24',
    percentage: '19%',
  },
  {name: 'اسم الشركه',
    number: '95',
    price: '23',
    low: '2',
    high:'9',
    open: '6',
    percentage: '90%',
  },
  {name: 'اسم الشركه',
    number: '23',
    price: '55',
    low: '8',
    high:'66',
    open: '34',
    percentage: '55%',
  }
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
        case 'number': return compare(+a.number, +b.number, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        case 'low': return compare(+a.low, +b.low, isAsc);
        case 'high': return compare(+a.high, +b.high, isAsc);
        case 'open': return compare(+a.open, +b.open, isAsc);
        case 'percentage': return compare(+a.percentage, +b.percentage, isAsc);
        default: return 0;
      }
    });
  }


}


function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
 