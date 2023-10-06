import {Component, Injector} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

import {catchError, of, Subject, Subscription, switchMap, take, takeUntil} from 'rxjs';
import {BaseService} from '@app/core/base.service';
import {
  ADD_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  MESSAGE_ERROR_DEFAULT,
  RESPONSE_CODE_SUCCESS,
  SNACKBAR_DANGER,
  SNACKBAR_SUCCESS,
  SNACKBAR_WARNING, UPDATE_ITEM_SUCCESS
} from '@shared/constants/app.constant';
import {SnackBarComponent} from '@shared/components/snack-bar/snack-bar.component';
import {IPagination} from '@shared/components/data-table/data-table.component';


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
  public pagination: IPagination = {
    page: 0,
    size: 5,
    total: 0,
  }
  public itemDetail: any;
  public formModel: FormGroup;
  public formSearch: FormGroup;

  public save$ = new Subject();

  public _destroy$ = new Subject();
  public _subscriptionAll$ = new Subscription();

  constructor(injector: Injector, service?: BaseService, dialogRef?: MatDialogRef<any>) {
    this.fb = injector.get(FormBuilder);
    this.snackBar = injector.get(MatSnackBar);
    this.matDialog = injector.get(MatDialog);

    this.baseService = service;
    this.dialogRef = dialogRef;

    // this.formModel = this.fb.group({});
  }

  getAll(params?: any) {
    this.baseService?.getListItem(params).pipe(takeUntil(this._destroy$)).subscribe((res: any) => {
      this.handleListItemResponse(res);
    })
  }

  handleListItemResponse(res: any){
    if(res?.code === RESPONSE_CODE_SUCCESS){
      console.log('List item', res);
      this.listItem = res.data;
      /*this.pagination.page = 0;
      this.pagination.total = this.listItem?.length;*/
      this.pagination = this.formatPagination(this.pagination, {page: 0, total: this.listItem?.length})
    }else{
      console.log('Get list fail', res);
      this.showSnackBar(res.message || MESSAGE_ERROR_DEFAULT, SNACKBAR_DANGER);
    }
  }

  formatPagination(initPage: any, overPage: any){
    return {
      ...initPage,
      ...overPage
    }
  }

  addNewItem(item?: any) {
    this?.baseService?.addItem(item).pipe(takeUntil(this._destroy$)).subscribe((res) => {
      if (res.code === RESPONSE_CODE_SUCCESS) {
        console.log('Add success', res);
        this.showSnackBar(ADD_ITEM_SUCCESS, SNACKBAR_SUCCESS);
        this.dialogRef?.close('reload');
      } else {
        console.log('Add fail', res);
        this.showSnackBar(res.message || MESSAGE_ERROR_DEFAULT, SNACKBAR_DANGER)
      }
    })
  }

  asyncAddOrEditItem() {
    this.save$.pipe(
      // @ts-ignore
      switchMap((obj: any) => {
        if (obj?.id) {
          return this.baseService?.updateItem(obj).pipe(catchError(err => of(null)));
        } else {
          return this.baseService?.addItem(obj).pipe(catchError(err => of(null)));
        }
      }),
      takeUntil(this._destroy$),
      catchError(err => of(null))
    ).subscribe(res => {
      if (res.code === RESPONSE_CODE_SUCCESS) {
        console.log('Add or edit success', res);
        this.showSnackBar(this.itemDetail ? UPDATE_ITEM_SUCCESS : ADD_ITEM_SUCCESS, SNACKBAR_SUCCESS);
        this.dialogRef?.close('reload');
      } else {
        console.log('Add or edit fail', res);
        this.showSnackBar(res.message || MESSAGE_ERROR_DEFAULT, SNACKBAR_DANGER)
      }
    })
  }
  getDetailById(id?: any, callback?: any) {
    this.baseService?.getItemById(id).pipe(takeUntil(this._destroy$)).subscribe((res: any) => {
      if (res.code === RESPONSE_CODE_SUCCESS) {
        console.log('Detail item', res);
        this.itemDetail = res.data;
        this.formModel?.patchValue(callback ? callback(this.itemDetail) : this.itemDetail);
      } else {
        console.log('Detail', res);
        this.showSnackBar(res.message, SNACKBAR_DANGER)
      }
    })
  }

  editItem(item?: any) {
    this.baseService?.updateItem(item).pipe(takeUntil(this._destroy$)).subscribe((res: any) => {
      if (res.code === RESPONSE_CODE_SUCCESS) {
        console.log('Update success', res)
        this.showSnackBar(UPDATE_ITEM_SUCCESS, SNACKBAR_SUCCESS);
      } else {
        console.log('Update fail', res)
        this.showSnackBar(res.message || MESSAGE_ERROR_DEFAULT, SNACKBAR_DANGER);
      }
    })
  }

  deleteItem(id?: any) {
    this.baseService?.deleteItem(id).pipe(takeUntil(this._destroy$)).subscribe((res) => {
      if (res.code === RESPONSE_CODE_SUCCESS) {
        console.log('Delete success', res);
        this.showSnackBar(DELETE_ITEM_SUCCESS, SNACKBAR_SUCCESS);
      } else {
        console.log('Delete fail', res);
        this.showSnackBar(res.message || MESSAGE_ERROR_DEFAULT, SNACKBAR_DANGER)
      }
    })
  }

  showSnackBar(message: any, type?: any): void {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === SNACKBAR_SUCCESS ? 'bg-lime-500' : type === SNACKBAR_WARNING ? 'bg-yellow-500' : 'bg-red-500'
    });

    /*Custom snack bar component*/
    /*this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: message,
        type: type
      },
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === SNACKBAR_SUCCESS ? 'bg-lime-500' : type === SNACKBAR_WARNING ? 'bg-yellow-500' : 'bg-red-500'
    })*/
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

  ngOnDestroy(){
    console.log('Destroy component');
    this._destroy$.next(null);
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

}
