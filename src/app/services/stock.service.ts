import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import { ServerPath } from '../constants/app-const';
import { LoginService } from './login.service';

@Injectable()
export class StockService {

  private stocksLink=ServerPath+"/api/stocks";

  constructor(
    private http:HttpClient,
    private loginService:LoginService          
  ) { }


  public getStockNameById(stockId):Observable<any>{
    return this.http.get<any>(this.stocksLink+"/"+stockId+"/name");
  }

  public getStockPriceById(stockId):Observable<any>{
    return this.http.get<any>(this.stocksLink+"/"+stockId+"/price");
  }

  public getStockPricesById(id:number):Observable<Array<any>>{
    return this.http.get<any[]>(ServerPath+"/api/stocksprices/"+id);
  }

}
