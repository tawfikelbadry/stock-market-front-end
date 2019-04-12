import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CompaniesService } from '../../../services/companies.service';
import { AdminService } from '../../../services/admin.service';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  private unVerifiedCompanies:Array<any>;

  constructor(private companyService:CompaniesService,private adminService:AdminService){

  }

  ngOnInit(): void {
    this.getUnverifiedCompanies();
  }

  getUnverifiedCompanies(){
    this.companyService.getUnVeifiedCompanies().subscribe(
      res=>{
        this.unVerifiedCompanies=res;
      }
    );
  }

  verifyCompany(id:number){
    this.adminService.verifyCompany(id).subscribe(
      res=>{
        alert("تم تفعيل الشركة");
        this.getUnverifiedCompanies();

      }
    );
    
  }
}