import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Nuclear energy production from 1965 to 2021 in US, UK, France, Germany, and Japan',
      align: 'center'
    },
    subtitle: {
      useHTML: true,
      text: 'Test chart',
      floating: true,
      verticalAlign: 'middle',
      y: 30
    },

    legend: {
      enabled: true
    },

    tooltip: {
      valueDecimals: 2,
      valueSuffix: ' TWh'
    },

    plotOptions: {
      series: {
        states: {
          inactive: {
            enabled: false,
            opacity: 1
          },
          hover: {
            enabled: false
          }
        },
        borderWidth: 0,
        colorByPoint: true,
        type: 'pie',
        size: '100%',
        innerSize: '80%',
        dataLabels: {
          enabled: false,
          crop: false,
          // @ts-ignore
          distance: '-10%',
          style: {
            fontWeight: 'bold',
            fontSize: '16px'
          },
          connectorWidth: 0
        }
      }
    },
    colors: ['#FCE700', '#F8C4B4', '#f6e1ea', '#B8E8FC', '#BCE29E'],
    series: [
      {
        type: 'pie',
        name: '1965',
        data: [['phong', 10], ['xie', 30], ['fengxie', 20]]
      }
    ]
  }; // required
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false
  constructor() { }

  ngOnInit(): void {
  }

}
