import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Http,Headers, RequestOptions , Response} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { ServerPath } from '../constants/app-const';
import { UserToken } from '../model/user-token';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  public redirectUrl: string;
  private authUrl =  ServerPath+ '/oauth/token';
  public static STORAGE_TOKEN_KEY = 'USER_TOKEN';
  private currentUserToken: UserToken;

  


  constructor(private http:Http,router:Router) { }


  sendCredentials(username: string, password: string): Observable<UserToken> {

    let params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', 'my-trusted-client');


    let headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic ' + btoa("my-trusted-client:secret") });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.authUrl, params.toString(), options)
      .map((res: Response) => {
        let token = res.json();
        token.login = username;
        console.log("Access_token " + token.access_token);
        this.saveUserToken(token);
        return token;
      }).catch((res:Response) =>{
        return res.json();
      });
  }

  saveUserToken(token) {
    localStorage.setItem(LoginService.STORAGE_TOKEN_KEY, JSON.stringify(token));
  }

  logout() {
    let token=this.getUserFromStorage().access_token;
    console.log(ServerPath+"/revoke/token?access_token="+token);
    return this.http.get(ServerPath+"/revoke/token?access_token="+token);

  
  }

  getCurrentUser(): UserToken {
    if (!this.currentUserToken) {
      this.currentUserToken = this.getUserFromStorage();
    }
    return this.currentUserToken;
  }

  getUserFromStorage(): UserToken {
    let token = localStorage.getItem(LoginService.STORAGE_TOKEN_KEY);
    return JSON.parse(token);
  }

  checkCredential() {
    if (localStorage.getItem(LoginService.STORAGE_TOKEN_KEY) == null)
      return false;
    return true;
  }


}
