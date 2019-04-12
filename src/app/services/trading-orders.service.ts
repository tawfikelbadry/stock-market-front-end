import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TradingOrder } from '../model/trading-order';
import { Observable } from "rxjs/Observable";
import { ServerPath } from '../constants/app-const';
import { LoginService } from './login.service';

@Injectable()
export class TradingOrdersService {


  private orderLink=ServerPath+"/api/tradingorders";

  constructor(private http:HttpClient,private loginService:LoginService) { }


  sendOrder(order:TradingOrder):Observable<any>{
    let token=this.loginService.getUserFromStorage();
    return this.http.post(this.orderLink+"/order?access_token="+token.access_token,order);
  }

  getCurrentUserOrders():Observable<Array<any>>{
    let token=this.loginService.getUserFromStorage();
    return this.http.get<any[]>(this.orderLink+"/current/orders?access_token="+token.access_token);
  }

  getCurrentUserSellOrders():Observable<Array<any>>{
    let token=this.loginService.getUserFromStorage();
    return this.http.get<any[]>(this.orderLink+"/current/orders/sell?access_token="+token.access_token);
  }

  getCurrentUserBuyOrders():Observable<Array<any>>{
    let token=this.loginService.getUserFromStorage();
    return this.http.get<any[]>(this.orderLink+"/current/orders/buy?access_token="+token.access_token);
  }


  getCurrentUserAllOffers():Observable<Array<any>>{
    let token=this.loginService.getUserFromStorage();
    return this.http.get<any[]>(this.orderLink+"/current/offers?access_token="+token.access_token);
  }

  getCurrentUserAllSellOffers():Observable<Array<any>>{
    let token=this.loginService.getUserFromStorage();
    return this.http.get<any[]>(this.orderLink+"/current/offers/sell?access_token="+token.access_token);
  }

  getCurrentUserAllBuyOffers():Observable<Array<any>>{
    let token=this.loginService.getUserFromStorage();
    return this.http.get<any[]>(this.orderLink+"/current/offers/buy?access_token="+token.access_token);
  }


  acceptSellOffer(offerId: number): Observable<any> {
    let token=this.loginService.getUserFromStorage();
    return this.http.post<any>(this.orderLink+"/accept/sellorder/"+offerId+"?access_token="+token.access_token,null);
  }

  acceptBuyOffer(offerId: number): Observable<any> {
    let token=this.loginService.getUserFromStorage();
    return this.http.post<any>(this.orderLink+"/accept/buyorder/"+offerId+"?access_token="+token.access_token,null);
  }

  cancelOrder(orderId: number): Observable<any> {
    let token=this.loginService.getUserFromStorage();
    return this.http.delete<any>(this.orderLink+"/cancel-order/"+orderId+"?access_token="+token.access_token);
  }
  

}
