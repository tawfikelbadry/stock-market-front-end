import { Injectable } from '@angular/core';
import { GoogleChartsBaseService } from './google-charts-base-service';

declare var google: any;

@Injectable()
export class GoogleLineChartService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildLineChart(elementId: string, data: any[], config: any) : void {  
    var chartFunc = () => { return new google.visualization.LineChart(document.getElementById(elementId)); };
    var options = {
      hAxis: {
        title: 'Time'
      },
      vAxis: {
        title: 'Popularity'
      },
      backgroundColor: '#f1f8e9'
    };

    this.buildChart(data, chartFunc, options);
  }

}
