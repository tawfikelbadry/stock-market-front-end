import { Component, OnInit, Input } from '@angular/core';
import { PieChartConfig } from '../../../model/pie-chart-config';
import { GoogleLineChartService } from '../../../services/charts/google-line-chart.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() data: any[];
  @Input() config: any;
  @Input() elementId: string;

  constructor(private _lineChartService: GoogleLineChartService) {}

  ngOnInit(): void {
      this._lineChartService.BuildLineChart(this.elementId, this.data, this.config); 
  }
}