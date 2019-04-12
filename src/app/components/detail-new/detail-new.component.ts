import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { News } from '../../model/news';
import { ServerPath } from '../../constants/app-const';

@Component({
  selector: 'app-detail-new',
  templateUrl: './detail-new.component.html',
  styleUrls: ['./detail-new.component.css']
})
export class DetailNewComponent implements  AfterViewInit ,OnInit {



  private news:News=new News();
  private imageLink:string=ServerPath+"/api/news/image/";



  constructor(private route:ActivatedRoute,
              private router:Router,
              private newsService:NewsService) { }

  ngOnInit() {
    this.getNewsById();
  }



  getNewsById(){
    let newsId=this.route.snapshot.params['id'];
    console.log('id : '+newsId);
    this.newsService.getNewsbyId(newsId).subscribe(
      res=>{
        this.news=res;
        this.news.imageLink=this.imageLink+""+newsId;
      },error=>{
        console.log(error);
      }
    );
  }

  showCompany(id){
    this.router.navigate(['/companyprofile',id]);
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

 

}
