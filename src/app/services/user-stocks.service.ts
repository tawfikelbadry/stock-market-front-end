import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerPath } from '../constants/app-const';
import { LoginService } from './login.service';
import { Observable } from 'rxjs/Observable';
import { UserStock } from '../model/user-stock';

@Injectable()
export class UserStocksService {

  userstocksLink=ServerPath+"/api/userstocks";

  constructor(private http:HttpClient,private loginService:LoginService) { }


  getCurrentUserStocks():Observable<Array<UserStock>>{
    let token=this.loginService.getUserFromStorage();
    return this.http.get<UserStock[]>(this.userstocksLink+"/user?access_token="+token.access_token);
  }

  getCurrentUserStockQuantitybyStockId(stockId):Observable<any>{
    let token=this.loginService.getUserFromStorage();
    return this.http.get<any>(this.userstocksLink+"/current/stockQuantity/"+stockId+"?access_token="+token.access_token);
  }

  getStockUsersById(stockId:number):Observable<Array<any>>{
    return this.http.get<any[]>(this.userstocksLink+"/"+stockId);
  }

}
