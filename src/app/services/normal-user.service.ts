import { Injectable } from '@angular/core';
import { NormalUser } from '../model/normal-user';
import { HttpClient } from '@angular/common/http';
import { ServerPath } from '../constants/app-const';
import { Observable }  from 'rxjs/Observable';
import { LoginService } from './login.service';
import { Company } from '../model/company';
import { News } from '../model/news';
@Injectable()
export class NormalUserService {

 
 
 
  private normalusersLink=ServerPath+"/api/normal-users";


  constructor(private http:HttpClient,private loginService:LoginService) { }

  registerUser(normal:NormalUser):Observable<any>{
    return this.http.post(this.normalusersLink+"/register",normal);
  }

  getCurrentUserPhoto(){
    let token=this.loginService.getUserFromStorage();
    return this.normalusersLink+"/image/current?access_token="+token.access_token;
  }

  getCurrentUserId():Observable<any>{
    let token=this.loginService.getUserFromStorage();
    return this.http.get(this.normalusersLink+"/current/UserId?access_token="+token.access_token);
  }

  getCurrentUserName():Observable<any>{
    let token=this.loginService.getUserFromStorage();
    return this.http.get<any>(this.normalusersLink+"/fullname?access_token="+token.access_token);
  }

  getCurrentUserTotalMoney(): any {
    let token=this.loginService.getUserFromStorage();
    return this.http.get(this.normalusersLink+"/totalMoney?access_token="+token.access_token);
  }

  getFollowingCompanies():Observable<Array<Company>>{
    let token=this.loginService.getUserFromStorage();
    return this.http.get<Company[]>(this.normalusersLink+"/following/current-user?access_token="+token.access_token);
  }

  checkFollowing(companyId:number): Observable<any> {
    let token=this.loginService.getUserFromStorage();
    return this.http.get<any>(this.normalusersLink+"/check-follow/"+companyId+"?access_token="+token.access_token);
  }

  followCompany(companyId:number):Observable<any>{
    let token=this.loginService.getUserFromStorage();
    return this.http.post<any>(this.normalusersLink+"/follow/"+companyId+"?access_token="+token.access_token,null);
  }

  unfollowCompany(companyId:number):Observable<any>{
    let token=this.loginService.getUserFromStorage();
    return this.http.post<any>(this.normalusersLink+"/unfollow/"+companyId+"?access_token="+token.access_token,null);
  }

  getFollowingCompaniesNews():Observable<Array<News>>{
    let token=this.loginService.getUserFromStorage();
    return this.http.get<News[]>(this.normalusersLink+"/current/following-news?access_token="+token.access_token);
  }

  getCurrentUserInfo():Observable<NormalUser>{
    let token=this.loginService.getUserFromStorage();
    return this.http.get<NormalUser>(this.normalusersLink+"/current/info?access_token="+token.access_token);
  }

  updateUser(user: any): Observable<any> {
    let token=this.loginService.getUserFromStorage();
    return this.http.put(this.normalusersLink+"/update/info?access_token="+token.access_token,user);
  }


}
