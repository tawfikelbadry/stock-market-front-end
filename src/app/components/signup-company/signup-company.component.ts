import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { SectorsService } from '../../services/sectors.service';
import { SectorName } from '../../model/SectorNames';
import { Company } from '../../model/company';
import { CompaniesService } from '../../services/companies.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrls: ['./signup-company.component.css']
})
export class SignupCompanyComponent implements  AfterViewInit ,OnInit {


  sectorNames:Array<SectorName>;

  private company:Company=new Company();

  private idsignedUp=false;

  constructor(private sectorService:SectorsService,private companyService:CompaniesService) { }

  signUp(){
    console.log(this.company);
    this.companyService.registerCompany(this.company).subscribe(
      res=>{
        console.log("result : "+res);
        if(res==2){
          console.log
        }
        this.idsignedUp=true;
      },
      error=>{
        console.log(error);
      }
    );

  }



  ngOnInit() {
    this.idsignedUp=false;

    this.sectorService.getAllSectorNames().subscribe(
      res=>{
        this.sectorNames=res;
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
 
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


}
