import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BaseService} from "./base.service";
import {Subject, Subscription, take} from "rxjs";

@Component({
  selector: 'app-base',
  template: ``,
  styles: []
})
export class BaseComponent {
  public fb: FormBuilder;
  public snackBar: MatSnackBar;
  public dialogService: MatDialog;
  public dataResponse: any;
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
    ref.afterClosed().pipe(take(1)).subscribe(value => {
      callback && callback(value);
    });
  }

  getAll(){
    this.baseService?.getAll().subscribe(res => {
      this.dataResponse = res.body;
    })
  }
}
