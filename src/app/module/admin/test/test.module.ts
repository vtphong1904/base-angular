import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import {TestComponent} from '@app/module/admin/test/test.component';
import {AddOrEditComponent} from '@app/module/admin/test/add-or-edit/add-or-edit.component';
import {SharedModule} from '@shared/shared.module';
import {TranslocoRootModule} from '@app/transloco-root.module';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    TestComponent,
    AddOrEditComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    SharedModule,
    TranslocoRootModule,
    NgSelectModule,
  ]
})
export class TestModule { }
