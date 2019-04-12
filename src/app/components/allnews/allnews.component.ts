import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../model/news';
import { ServerPath } from '../../constants/app-const';
import { CompaniesService } from '../../services/companies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allnews',
  templateUrl: './allnews.component.html',
  styleUrls: ['./allnews.component.css']
})
export class AllnewsComponent implements  AfterViewInit ,OnInit {


  topNews:News;
  top6_1News:Array<News>;
  pageNews:Array<News>;
  imageLink:string=ServerPath+"/api/news/image/";



  pageNumber:number;
  newsLength:number;

  
  constructor(private newsService:NewsService,
              private companiesService:CompaniesService,
              private router:Router
            ) { }

  ngOnInit() {
    this.pageNumber=1;
    this.getLatestNews();
    this.getTop6_1News();
    this.getPageNews(10);
    this.getNewsLength();
  }


  getPageNews(size){
    this.newsService.getNewsPage(this.pageNumber,size).subscribe(
      res=>{
        this.pageNews=res;
        for(let x=0;x<this.pageNews.length;x++){
         this.pageNews[x].imageLink=this.imageLink+""+this.pageNews[x].id;
        }
      },error=>{
        console.log(error);
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

  getNewsLength(){
    this.newsService.countNews().subscribe(
      res=>{
        this.newsLength=res['count'];
      }
    );
  }


  showCompanyProfile(compId:number){
    this.router.navigate(['/companyprofile',compId]);
    window.scrollTo(0,0);
  }

  showNewsDetails(newsId:number){
    this.router.navigate(['/news-details',newsId]);
    window.scrollTo(0,0);

  }


  changePage(event){
    let pageSize=event.pageSize;
    let pageIndex=event.pageIndex;
    this.pageNumber=pageIndex+1;
    this.getPageNews(pageSize);
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
