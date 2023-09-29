import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Subject, Subscription, take} from 'rxjs';
import {BaseService} from '@app/core/base.service';


@Component({
  selector: 'app-base',
  template: ``,
  styles: []
})
export class BaseComponent {
  public fb: FormBuilder;
  public snackBar: MatSnackBar;
  public dialogService: MatDialog;
  public listItem: any;

  public _destroy$ = new Subject();
  public _subscriptionAll$ = new Subscription();

  constructor(injector: Injector, private baseService?: BaseService) {
    this.fb = injector.get(FormBuilder);
    this.snackBar = injector.get(MatSnackBar);
    this.dialogService = injector.get(MatDialog)
  }

  showSnackBar(messages?: any, type?: any): void {
    this.snackBar.open(messages, '', {
      panelClass: type === 'success' ? 'bg-lime-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
    });
  }

  showDialog(component?: any, options: MatDialogConfig = {}, callback?: any) {
    const ref = this.dialogService.open(component, {
      width: '30vw',
      ...options
    });
    ref.afterClosed().pipe(take(1)).subscribe((value: any) => {
      callback && callback(value);
    });
  }

  getAll(){
    this.baseService?.getListItem().subscribe(res => {
      console.log('res', res)
      this.listItem = res.body;
    })
  }
}
