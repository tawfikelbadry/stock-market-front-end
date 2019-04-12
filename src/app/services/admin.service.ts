import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ServerPath } from '../constants/app-const';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable()
export class AdminService {


  constructor(private http:HttpClient,private loginService:LoginService) { }

  verifyCompany(id:number): Observable<any> {
    let token=this.loginService.getUserFromStorage();
    return this.http.post(ServerPath+"/admin/verify-company/"+id+"?access_token="+token.access_token,null);
  }

}
