import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServerPath } from '../constants/app-const';
import { LoginService } from './login.service';
import { UserToken } from '../model/user-token';

@Injectable()
export class UserService {

  constructor(private router:Router,private http:HttpClient,
              private loginService:LoginService ) { }


  getCurrentUserRoles(){
    let token= this.loginService.getUserFromStorage();
    console.log(ServerPath+"/user-roles?access_token="+token.access_token);
    return this.http.get(ServerPath+"/user-roles?access_token="+token.access_token);
  }

}
