import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerPath } from '../constants/app-const';
import { Observable } from "rxjs/Observable";
import { LoginService } from './login.service';

@Injectable()
export class UserOperationsService {

  useroperationsLink=ServerPath+"/api/trading-operations";

  
  constructor(private http:HttpClient,private loginService:LoginService) { }


  getUserTradingOPeration():Observable<Array<any>>{
    let token=this.loginService.getUserFromStorage();
     return this.http.get<any[]>(this.useroperationsLink+"/current-user?access_token="+token.access_token);
  }

}
