import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JustinaXieRoutingModule } from './justina-xie-routing.module';
import { JustinaXieComponent } from './justina-xie.component';


@NgModule({
  declarations: [
    JustinaXieComponent
  ],
  imports: [
    CommonModule,
    JustinaXieRoutingModule
  ]
})
export class JustinaXieModule { }
