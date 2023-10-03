import {Component, Injector} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

import {catchError, of, Subject, Subscription, switchMap, take, takeUntil} from 'rxjs';
import {BaseService} from '@app/core/base.service';
import {
  RESPONSE_CODE_SUCCESS,
  SNACKBAR_DANGER,
  SNACKBAR_SUCCESS,
  SNACKBAR_WARNING
} from '@shared/constants/app.constant';


@Component({
  selector: 'app-base',
  template: ``,
  styles: []
})
export class BaseComponent {
  public fb: FormBuilder;
  public baseService: BaseService | undefined;
  public snackBar: MatSnackBar;
  public matDialog: MatDialog;
  public dialogRef: MatDialogRef<any> | undefined;

  public listItem: any;
  public itemDetail: any;
  public formModel: FormGroup;
  public formSearch: FormGroup;

  public _destroy$ = new Subject();
  public _subscriptionAll$ = new Subscription();

  public save$ = new Subject();

  constructor(injector: Injector, service?: BaseService, dialogRef?: MatDialogRef<any>) {
    this.fb = injector.get(FormBuilder);
    this.snackBar = injector.get(MatSnackBar);
    this.matDialog = injector.get(MatDialog);

    this.baseService = service;
    this.dialogRef = dialogRef;

    // this.formModel = this.fb.group({});
  }

  showSnackBar(messages?: any, type?: any): void {
    this.snackBar.open(messages, '', {
      panelClass: type === SNACKBAR_SUCCESS ? 'bg-lime-500' : type === SNACKBAR_WARNING ? 'bg-yellow-500' : 'bg-red-500'
    });
  }

  showDialog(component?: any, options: MatDialogConfig = {}, callback?: any) {
    const ref = this.matDialog.open(component, {
      width: '30vw',
      ...options
    });
    ref.afterClosed().pipe(take(1)).subscribe((value: any) => {
      callback && callback(value);
    });
  }

  getAll() {
    this.baseService?.getListItem().pipe(takeUntil(this._destroy$)).subscribe((res: any) => {
      /*if(res.code === RESPONSE_CODE_SUCCESS){
        this.listItem = res.data;
      }else{
        this.showSnackBar(res.message, SNACKBAR_DANGER);
      }*/
      console.log('res', res)
      this.listItem = res.data;
    })
  }

  getDetailById(id?: any) {
    this.baseService?.getItemById(id).pipe(takeUntil(this._destroy$)).subscribe((res: any) => {
      /*if(res.code === RESPONSE_CODE_SUCCESS){
        this.itemDetail = res.data;
      }else{
        this.showSnackBar(res.message, SNACKBAR_DANGER)
      }*/
      console.log('detail', res);
      this.formModel?.patchValue(res);
    })
  }

  deleteItem(id?: any){
    console.log(this.baseService)
    this.baseService?.deleteItem(id).pipe(takeUntil(this._destroy$)).subscribe((res) => {
      /*if(res.code === RESPONSE_CODE_SUCCESS){
        this.showSnackBar(res.message, SNACKBAR_SUCCESS);
      }else{
        this.showSnackBar(res.message, SNACKBAR_DANGER)
      }*/
      console.log('delete', res);
      this.dialogRef?.close('reload');
    })
  }

  updateItem(item?: any){
    this.baseService?.updateItem(item).pipe(takeUntil(this._destroy$)).subscribe((res: any) => {
      /*if(res.code === RESPONSE_CODE_SUCCESS){
        this.showSnackBar(res.message, SNACKBAR_SUCCESS);
      }else {
        this.showSnackBar(res.message, SNACKBAR_DANGER);
      }*/
      console.log('update', res);
      this.formModel?.patchValue(res)
    })
  }

  addItem(item?: any){
    /*this?.baseService?.addNewItem(item).pipe(takeUntil(this._destroy$)).subscribe((res) => {
      /!*if(res.code === RESPONSE_CODE_SUCCESS){
        this.showSnackBar(res.message, SNACKBAR_SUCCESS);
      }else{
        this.showSnackBar(res.message, SNACKBAR_DANGER)
      }*!/
      console.log('add new', res);
      this.dialogRef?.close('reload')
    })*/

    this.save$.pipe(
      // @ts-ignore
      switchMap((obj: any) => {
        return this.baseService?.addNewItem(obj).pipe(catchError(err => of(null)));
      }),
      takeUntil(this._destroy$),
      catchError(err => of(null))
    ).subscribe(res => {
      console.log('add new', res);
      this.dialogRef?.close('reload')
    })
  }


}
