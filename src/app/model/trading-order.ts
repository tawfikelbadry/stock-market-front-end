import { NormalUser } from "./normal-user";
import { Stock } from "./stock";

export class TradingOrder {
 
    id : number;
    wantedPrice : number;
    type : string;
    count : 700;
    user :NormalUser=new NormalUser(); 
    
    stock :Stock=new Stock();
 
}
