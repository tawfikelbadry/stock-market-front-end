import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../model/company';
import { ServerPath } from '../../constants/app-const';
import { UploadImageService } from '../../services/upload-image.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-company-setting',
  templateUrl: './company-setting.component.html',
  styleUrls: ['./company-setting.component.css']
})
export class CompanySettingComponent implements  AfterViewInit ,OnInit {

  private loggedCompany:any;
  imageUrl=ServerPath+"/api/companies/image/";

  constructor(private companiesService:CompaniesService,private uploadImageService:UploadImageService,
              public snackBar: MatSnackBar
             ) { }

  ngOnInit() {
    // get logged company info
    this.companiesService.getLoggedCompany().subscribe(
      res=>{
        this.loggedCompany=res;
        this.imageUrl+=this.loggedCompany.id;
      }
    );
  }

  changeImage(){
    this.uploadImageService.upload(ServerPath+"/api/companies/add/image?id=",this.loggedCompany.id);
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 1000,
    });
  }

  updateCompany(){
    console.log(this.loggedCompany);
    let companyToUpdate={
      "id":this.loggedCompany.id,
      "companyName":this.loggedCompany.companyName,
      "companyCurrentTotalStocksNumber":this.loggedCompany.companyCurrentTotalStocksNumber,
      "companyCapital":this.loggedCompany.companyCapital,
      "companyStartDate":this.loggedCompany.companyStartDate,
      "companyWorkField":this.loggedCompany.companyWorkField,
      "stock":{
        "bookValue":this.loggedCompany.stock.bookValue,
        "bokValueMultiplier":this.loggedCompany.stock.bokValueMultiplier,
        "gainOfStock":this.loggedCompany.stock.gainOfStock,
        "multiplierGainofStock":this.loggedCompany.stock.multiplierGainofStock
      }
    };
    this.companiesService.updateCompany(companyToUpdate).subscribe(
      res=>{
        this.snackBar.openFromComponent(PizzaPartyComponent, {
          duration: 1000,
        });
        },error=>{
        console.log("error : "+error);
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
 
}

@Component({
  selector: 'snack-bar-ImageSaved',
  templateUrl: 'snack-bar-ImageSaved.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `]
})
export class PizzaPartyComponent {}