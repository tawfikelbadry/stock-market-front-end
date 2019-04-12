import { ServerPath } from './../constants/app-const';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Sector } from '../model/sector';
import { SectorName } from '../model/SectorNames';


@Injectable()
export class SectorsService {

  private sectorsApiLink=ServerPath+"/api/sectors";

  constructor(private http:HttpClient) { }


  getAllSectors():Observable<Sector[]>{
    return this.http.get<Sector[]>(this.sectorsApiLink);
  }

  getAllSectorNames():Observable<SectorName[]>{
    return this.http.get<SectorName[]>(this.sectorsApiLink+"/sectorIdAndNames");
  }

  getSectorCompaniesById(sectorId):Observable<Array<any>>{
    return this.http.get<any[]>(this.sectorsApiLink+"/"+sectorId+"/companies");
  }

  getSectorPricesBySectorId(sectorId:number):Observable<Array<any>>{
    return this.http.get<any[]>(this.sectorsApiLink+"/sector-prices/"+sectorId);
  }


}
