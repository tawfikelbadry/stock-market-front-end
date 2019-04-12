import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerPath } from '../constants/app-const';
import {Observable} from 'rxjs/Observable';
import { News } from '../model/news';
import { LoginService } from './login.service';

@Injectable()
export class NewsService {

  private newsLink=ServerPath+"/api/news";

  constructor(private http:HttpClient,private loginService:LoginService) { }


  getTop6_1News():Observable<Array<News>>{
    return this.http.get<News[]>(this.newsLink+"/top6-1");
  }

  getTopNews():Observable<News>{
    return this.http.get<News>(this.newsLink+"/top1");
  }

  getNewsPage(page:number,size:number):Observable<Array<News>>{
    return this.http.get<News[]>(this.newsLink+"/page/"+page+"/size/"+size);
  }

  getNewsbyId(newsId:number):Observable<News>{
    return this.http.get<News>(this.newsLink+"/"+newsId);
  }

  countNews(): Observable<any> {
    return this.http.get<any>(this.newsLink+"/size");
  }

  getCurrentCompanyNews(): Observable<Array<News>> {
    let token=this.loginService.getUserFromStorage();
    return this.http.get<News[]>(this.newsLink+"/current/news?access_token="+token.access_token);
  }

  updateNews(news:News): Observable<any> {
    let token=this.loginService.getUserFromStorage();
    console.log(token);
    return this.http.post<any>(this.newsLink+"/update?access_token="+token.access_token,news);
  }

  addNewNews(news:News): Observable<News> {
    let token=this.loginService.getUserFromStorage();
    return this.http.post<News>(this.newsLink+"/add?access_token="+token.access_token,news);
  }

  removeNewById(id:number):Observable<any>{
    let token=this.loginService.getUserFromStorage();
    return this.http.delete<any>(this.newsLink+"/remove/"+id+"?access_token="+token.access_token);
  }

 

}
