import { Sort } from '@angular/material';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NormalUserService } from '../../../services/normal-user.service';
import { Company } from '../../../model/company';
import { Router } from '@angular/router';
import { News } from '../../../model/news';
import { ServerPath } from '../../../constants/app-const';

@Component({
  selector: 'app-up-watch',
  templateUrl: './up-watch.component.html',
  styleUrls: ['./up-watch.component.css']
})
export class UpWatchComponent implements  AfterViewInit ,OnInit {

  imageLink:string=ServerPath+"/api/news/image/";


  followingCompanies:Array<Company>;
  followingNews:Array<News>;

  constructor(private normalUserService:NormalUserService,
              private router:Router) {
    this.sortedData = this.stocks.slice();
  }


  ngOnInit() {
    this.getCurrentUserFollowingCompanies();
    this.getCurrentFollowingCompanyNews();
  }

  getCurrentUserFollowingCompanies(){
    this.normalUserService.getFollowingCompanies().subscribe(
      res=>{
        this.followingCompanies=res;
      },error=>{
        console.log("error");
      }
    );
  }

  getCurrentFollowingCompanyNews(){
    this.normalUserService.getFollowingCompaniesNews().subscribe(
      res=>{
        this.followingNews=res;
        for(let x=0;x<this.followingNews.length;x++){
          this.followingNews[x].imageLink=this.imageLink+""+this.followingNews[x].id;
         }
      }
    );
  }

  showCompanyProfile(id:number){
    this.router.navigate(["/companyprofile",id]);
    window.scrollTo(0,0);
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
 
