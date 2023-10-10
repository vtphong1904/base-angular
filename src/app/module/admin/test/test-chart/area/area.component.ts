import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: any = {
    chart: {
      type: 'areaspline'
    },
    title: {
      text: 'Moose and deer hunting in Norway, 2000 - 2021',
      align: 'left'
    },
    /*subtitle: {
      text: 'Source: <a href="https://www.ssb.no/jord-skog-jakt-og-fiskeri/jakt" target="_blank">SSB</a>',
      align: 'left'
    },*/
    legend: {
      enabled: false
      /*layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 120,
      y: 70,
      floating: true,
      borderWidth: 1,
      backgroundColor:
      // @ts-ignore
        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'*/
    },
    xAxis: {
      /*plotBands: [{ // Highlight the two last years
        from: 2019,
        to: 2020,
        color: 'rgba(68, 170, 213, .2)'
      }]*/
    },
    yAxis: {
      title: {
        text: 'Core'
      }
    },
    tooltip: {
      shared: true,
      headerFormat: '<b>Hunting season starting autumn {point.x}</b><br>'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
        pointStart: 2000,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false
            },
          }
        }
      },
      areaspline: {
       /* fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            // @ts-ignore
            [0, Highcharts.getOptions().colors[0]],
            // @ts-ignore
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },*/
        fillOpacity: 0.5
      }
    },
    series: [{
      name: 'Moose',
      lineWidth: 4,
      data:
        [
          38000,
          37300,
          37892,
          38564,
          36770,
          36026,
          34978,
          35657,
          35620,
          35971,
          36409,
          36435,
          34643,
          34956,
          33199,
          31136,
          30835,
          31611,
          30666,
          30319,
          31766
        ]
    }, /*{
      name: 'Deer',
      data:
        [
          22534,
          23599,
          24533,
          25195,
          25896,
          27635,
          29173,
          32646,
          35686,
          37709,
          39143,
          36829,
          35031,
          36202,
          35140,
          33718,
          37773,
          42556,
          43820,
          46445,
          50048
        ]
    }*/]
  }; // required
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false
  constructor() { }

  ngOnInit(): void {
    // @ts-ignore
    console.log( Highcharts.getOptions().colors[0]);
    // @ts-ignore
    console.log(Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba'))
  }

}
