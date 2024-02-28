import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThinComponent } from './thin/thin.component';
import {SharedModule} from '@shared/shared.module';
import {TranslocoRootModule} from '@app/transloco-root.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    ThinComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TranslocoRootModule
  ]
})
export class LayoutModule { }
