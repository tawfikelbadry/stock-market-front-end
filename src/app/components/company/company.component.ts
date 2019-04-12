import { Sort } from '@angular/material';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Sector } from '../../model/sector';
import { SectorsService } from '../../services/sectors.service';
import { CompaniesService } from '../../services/companies.service';
import { Router } from '@angular/router';

import * as Chart from 'chart.js';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements  AfterViewInit ,OnInit {
 
  selectedSector:string;
  selectedPointer:string;

  sectorsSet:Array<Sector>;

  companiesSet:Array<any>;

  topCompaniesSet:Array<any>;

  lineChart:any;


  constructor(
              private sectorService:SectorsService,
              private companiesService:CompaniesService,
              private router:Router
            ) {
    this.sortedData = this.stocks.slice();
   }


  ngOnInit() {
    this.getSectorsData();
    this.getCompaniesData();
    this.getTop10CompaniesWithTradingVolume();
    this.drawLineChartForSector(1);
    this.selectedSector="كل القطاعات";
    this.selectedPointer="مؤشر قطاع البنوك";
  }


  getSectorsData(){
    this.sectorService.getAllSectors().subscribe(
      res=>{
        this.sectorsSet=res;
      },
      error=>{
        console.log(error);
      }
    );
  }

  showCompanyProfile(id:number){
    this.router.navigate(["/companyprofile",id]);
    window.scrollTo(0,0);
  }


  getCompaniesData(){
    this.companiesService.getCompanies().subscribe(
      res=>{
        this.companiesSet=res;
      },
      error=>{
          console.log(error)
      }
    );
  }

  getSectorCompanies(id,name){
    this.sectorService.getSectorCompaniesById(id).subscribe(
      res=>{
        this.companiesSet=res;
        this.drawLineChartForSector(id);
        this.selectedSector="شركات قطاع "+name;
        this.selectedPointer="مؤشر قطاع "+name;
      },error=>{
        console.log(error);
      }
    );

    this.companiesService.getSectorTop10CompaniesTradingVolume(id).subscribe(
      res=>{
        this.topCompaniesSet=res;
      },error=>{
        console.log(error)
      }
    );

  }

  

  getTop10CompaniesWithTradingVolume(){
    this.companiesService.getTop10CompaniesTradingVolume().subscribe(
      res=>{
        this.topCompaniesSet=res;
      },error=>{
        console.log(error)
      }
    );
  }


  drawLineChartForSector(sectorId:number){
    let dateLabels:Array<Date>=new Array();
    let dataSectorPrices:Array<any>=new Array();

    let sectorPrices:Array<any>;
    
    this.sectorService.getSectorPricesBySectorId(sectorId).subscribe(
      res=>{
        sectorPrices=res;

        for(let l=0;l<sectorPrices.length;l++){
          dateLabels[l]=sectorPrices[l]['date'];
        
          dataSectorPrices[l]={
            t:sectorPrices[l]['date'],
            y:sectorPrices[l]['price']
          }
        }

        this.lineChart=new Chart('lineChart',{
          type:'line',
          data:{
          labels: dateLabels,
          datasets: [{
            label: 'Stock prices',
            data: dataSectorPrices,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      }
          }
         );

      },error=>{
        console.log("error : "+error);
      }
    );
  }



  async ngAfterViewInit() {
    await this.loadScript('./assets/vendor/jquery/jquery.js');
    await this.loadScript('./assets/vendor/bootstrap/js/bootstrap.js');
    await this.loadScript('./assets/vendor/font-awesome/fontawesome-all.min.js');
    await this.loadScript('./assets/vendor/nicescroll/jquery.nicescroll.min.js');
    await this.loadScript('./assets/vendor/slick/slick.min.js');
    await this.loadScript('./assets/js/app.js');
  
    }
    private loadScript(scriptUrl: string) {
      return new Promise((resolve, reject) => {
          const scriptElement = document.createElement('script')
          scriptElement.src = scriptUrl
          scriptElement.onload = resolve
          document.body.appendChild(scriptElement)
      })
    }

///// code for abdelhameed /// 

  stocks = [
    {name: 'اسم السهم',
    lastPrice: '20-2-2018',
    changeRate: '6',
    change: '24',
    value: '19',
    numberStock: '5',
    priceOpen:'20',
    low: '10',
    high:'100'
  },
  {name: 'اسم السهم',
    lastPrice: '20-2-2018',
    changeRate: '6',
    change: '24',
    value: '19',
    numberStock: '5',
    priceOpen:'20',
    low: '10',
    high:'100'
  },
  {name: 'اسم السهم',
    lastPrice: '20-2-2018',
    changeRate: '6',
    change: '24',
    value: '19',
    numberStock: '5',
    priceOpen:'20',
    low: '10',
    high:'100'
  }
  ];

  sortedData;

 
   sortData(sort: Sort) {
    const data = this.stocks.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'lastPrice': return compare(+a.lastPrice, +b.lastPrice, isAsc);
        case 'changeRate': return compare(+a.changeRate, +b.changeRate, isAsc);
        case 'change': return compare(+a.change, +b.change, isAsc);
        case 'value': return compare(+a.value, +b.value, isAsc);
        case 'numberStock': return compare(+a.numberStock, +b.numberStock, isAsc);
        case 'priceOpen': return compare(+a.priceOpen, +b.priceOpen, isAsc);
        case 'low': return compare(+a.low, +b.low, isAsc);
        case 'high': return compare(+a.high, +b.high, isAsc);
        default: return 0;
      }
    });
  }

  

}


function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}