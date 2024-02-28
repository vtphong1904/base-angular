import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ThinComponent} from '@shared/layout/thin/thin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'test'},
  {
    path: '',
    component: ThinComponent,
    data: {
      breadcrumb: {
        label: 'Home',
        url: '/'
      }
    },
    children: [
      {
        path: 'test',
        loadChildren: () => import('app/module/admin/test/test.module').then(m => m.TestModule),
        data: {breadcrumb: {label: 'test', url: '/'}}
      },
      {
        path: 'justina-xie',
        loadChildren: () => import('app/module/admin/justina-xie/justina-xie.module').then(m => m.JustinaXieModule),
        data: {breadcrumb: {label: 'Xie', url: 'justina-xie'}}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
