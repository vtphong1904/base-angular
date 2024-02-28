import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JustinaXieComponent} from '@app/module/admin/justina-xie/justina-xie.component';

const routes: Routes = [
  {
    path: '',
    component: JustinaXieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JustinaXieRoutingModule { }
