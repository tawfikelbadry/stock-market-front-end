import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { News } from '../../../model/news';
import { NewsService } from '../../../services/news.service';
import { ServerPath } from '../../../constants/app-const';
import { UploadImageService } from '../../../services/upload-image.service';


@Component({
    moduleId: module.id,
    selector: 'company-news',
    templateUrl: 'company-news.component.html',
    styleUrls: ['company-news.component.scss']
})
export class CompanyNewsComponent implements  OnInit,AfterViewInit {

  public CompanyNews:Array<News>;
  imageLink:string=ServerPath+"/api/news/image/";


  private newNews:News=new News();


  constructor(public dialog: MatDialog,private newsService:NewsService,
              private uploadImageService:UploadImageService) {
        
  }

  ngOnInit(): void {
    this.getCurrentCompanyNews();
  }


  getCurrentCompanyNews(){
    this.newsService.getCurrentCompanyNews().subscribe(
      res=>{
        this.CompanyNews=res;
        for(let x=0;x<this.CompanyNews.length;x++){
          this.CompanyNews[x].imageLink=this.imageLink+""+this.CompanyNews[x].id;
         }
      }
    );
  }




  addNewNews(){
    this.newsService.addNewNews(this.newNews).subscribe(
      res=>{
        this.uploadImageService.upload(ServerPath+"/api/news/add/image?id=",res['newsId']);
        this.getCurrentCompanyNews();
        this.newNews=new News();
      },error=>{
        console.log(error);
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

    remove(newsId:number): void {
        let dialogRef = this.dialog.open(RemoveNews, {
          width: '350px',
          data: { newId:newsId }
        });
        
        dialogRef.afterClosed().subscribe(result => {
          this.getCurrentCompanyNews();
        });
      }
    edit(newsId:number): void {
        let dialogRef = this.dialog.open(EditNews, {
            width: '350px',
            data: {newId:newsId }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            this.getCurrentCompanyNews();
        });
    }
}
@Component({
  selector: 'remove-news',
  templateUrl: 'remove-news.html',
})
export class RemoveNews {

  isRemoved=false;
  constructor(
    public dialogRef: MatDialogRef<RemoveNews>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private newsService:NewsService) {
      this.isRemoved=false;
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeNew(){
    this.newsService.removeNewById(this.data.newId).subscribe(
      res=>{
        this.isRemoved=true;
      }
    );
  }

}


@Component({
    selector: 'edit-news',
    templateUrl: 'edit-news.html',
  })
  export class EditNews implements OnInit{

    private news:News=new News();


    private isUpdated=false;
    
  
    constructor(
      public dialogRef: MatDialogRef<EditNews>,
      @Inject(MAT_DIALOG_DATA) public data: any,private newsService:NewsService) { }

    ngOnInit(): void {
      this.isUpdated=false;
      this.news.id=this.data.newId;
      this.newsService.getNewsbyId(this.data.newId).subscribe(
        res=>{
          this.news.title=res['title'];
          this.news.body=res['body'];

        }
      );

    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    editNews(){
      this.newsService.updateNews(this.news).subscribe(
        res=>{
          this.isUpdated=true;

        },error=>{
          console.log(error);
        }
      );
    }  
  
  }