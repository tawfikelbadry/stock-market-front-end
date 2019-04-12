import { Sector } from "./sector";
import { Stock } from "./stock";

export class Company {
    id:number;
    username :string;
    email : string;
    password : string;
    companyName : string;
    companyWorkField : string;
    companyStartDate : Date;
    verifiedState = false;

    companySector : Sector=new Sector();

}
