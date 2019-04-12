import { ServerPath } from './../constants/app-const';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '../model/company';
import "rxjs/add/operator/map";
import { LoginService } from './login.service';


@Injectable()
export class CompaniesService {


  private companiesLink=ServerPath+"/api/companies";

  private companies:Array<any>;

  constructor(private http:HttpClient,private loginService:LoginService) { }

  getCompanies():Observable<Array<any>>{
    return this.http.get<any[]>(this.companiesLink+"/verified");
  }

    
  getUnVeifiedCompanies(): Observable<Array<any>> {
    return this.http.get<any[]>(this.companiesLink+"/unverified");

  }

  getTop10CompaniesTradingVolume():Observable<Array<any>>{
    return this.http.get<any[]>(this.companiesLink+"/top-n-by-tradingvolume/10");
  }

  getSectorTop10CompaniesTradingVolume(sectorId):Observable<Array<any>>{
    return this.http.get<any[]>(this.companiesLink+"/top-n-by-SectorIdAndtradingvolume/"+sectorId+"/size/10");
  }

  getCompany(companyId:number):Observable<any>{
    return this.http.get(this.companiesLink+"/"+companyId);
  }

  registerCompany(company:Company){
    return this.http.post(this.companiesLink+"/register",company);
  }

  findCompanies(key: string): Observable<Array<any>> {
    return this.http.get<any[]>(this.companiesLink+"/search/"+key);
  }

  getLoggedCompany(): Observable<Company> {
    let token=this.loginService.getUserFromStorage();
    return this.http.get<Company>(this.companiesLink+"/current/user?access_token="+token.access_token);
  }

  updateCompany(company:any):Observable<any>{
    let token=this.loginService.getUserFromStorage();
    return this.http.post<any>(this.companiesLink+"/update?access_token="+token.access_token,company);
  }



}
