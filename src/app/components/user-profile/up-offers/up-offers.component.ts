import { Component, OnInit } from '@angular/core';
import { TradingOrdersService } from '../../../services/trading-orders.service';

@Component({
  selector: 'app-up-offers',
  templateUrl: './up-offers.component.html',
  styleUrls: ['./up-offers.component.css']
})
export class UpOffersComponent implements OnInit {

  allOffers:Array<any>;
  sellOffers:Array<any>;
  buyOffers:Array<any>;


  constructor(private tradingOffersService:TradingOrdersService) { }

  ngOnInit() {
    this.getCurrentUserAllOffers();
    this.getCurrentUserSellOffers();
    this.getCurrentUserBuyOffers();
  }


  acceptSellOffer(offerId){
    console.log("offerId : "+offerId);
    this.tradingOffersService.acceptSellOffer(offerId).subscribe(
      res=>{
        console.log("result : "+res);
        if(res['responseKey']==1){
          alert("تم قبول العرض بنجاح");
          this.getCurrentUserAllOffers();
          this.getCurrentUserBuyOffers();
          this.getCurrentUserSellOffers();
        }
      },error=>{
        console.log(error);
      }
    );
  }

  acceptBuyOffer(offerId){
    console.log("offerId : "+offerId);
    this.tradingOffersService.acceptBuyOffer(offerId).subscribe(
      res=>{
        console.log("result : "+res);
        if(res['responseKey']==1){
          alert("تم قبول عرض الشراء بنجاح");
          this.getCurrentUserAllOffers();
          this.getCurrentUserBuyOffers();
          this.getCurrentUserSellOffers();
        }
      },error=>{
        console.log(error);
      }
    );
  }



  getCurrentUserAllOffers(){
    this.tradingOffersService.getCurrentUserAllOffers().subscribe(
      res=>{
        this.allOffers=res;
      },error=>{

      }
    );
  }

  getCurrentUserSellOffers(){
    this.tradingOffersService.getCurrentUserAllSellOffers().subscribe(
      res=>{
        this.sellOffers=res;
      }
    );
  }

  getCurrentUserBuyOffers(){
    this.tradingOffersService.getCurrentUserAllBuyOffers().subscribe(
      res=>{
        this.buyOffers=res;
      }
    );
  }

}
