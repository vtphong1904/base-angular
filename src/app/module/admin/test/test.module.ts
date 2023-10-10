import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import {TestComponent} from '@app/module/admin/test/test.component';
import {AddOrEditComponent} from '@app/module/admin/test/add-or-edit/add-or-edit.component';
import {SharedModule} from '@shared/shared.module';
import {TranslocoRootModule} from '@app/transloco-root.module';
import { TestChartComponent } from './test-chart/test-chart.component';
import { PieComponent } from './test-chart/pie/pie.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AreaComponent } from './test-chart/area/area.component';


@NgModule({
  declarations: [
    TestComponent,
    AddOrEditComponent,
    TestChartComponent,
    PieComponent,
    AreaComponent
  ],
    imports: [
        CommonModule,
        TestRoutingModule,
        SharedModule,
        TranslocoRootModule,
      HighchartsChartModule
    ]
})
export class TestModule { }
