import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {IColumnTable, IPagination} from '@shared/components/data-table/data-table.component';
import {BaseComponent} from '@app/core/base.component';
import {ConfirmDialogComponent} from '@shared/components/confirm-dialog/confirm-dialog.component';
import {AddOrEditComponent} from '@app/module/admin/test/add-or-edit/add-or-edit.component';
import {TestService} from '@shared/services/test.service';
import {TranslocoService} from '@ngneat/transloco';
import {FormArray} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends BaseComponent implements OnInit, OnDestroy {

  testForm = this.fb.group({
    configs: this.fb.array([
      this.fb.group({
        name: '',
        age: ''
      })
    ])
  })

  override pagination: IPagination = {
    page: 0,
    size: 10,
    total: 0,
    isShow: true
  }
  columns: IColumnTable[] = [
    {
      columnDef: 'stt',
      header: 'STT',
      flex: 0.3,
    },
    {
      columnDef: 'name',
      header: 'Name',
      flex: 0.3,
    },
    {
      columnDef: 'code',
      header: 'Code',
    },
    {
      columnDef: 'action',
      header: 'Hành động',
      flex: 0.5,
      actions: ['view','edit', 'delete'],
    }
  ];
  checked = false;
  constructor(injector: Injector, private testService: TestService, private _translocoService: TranslocoService) {
    super(injector, testService)
  }

  get configs(){
    return this.testForm.get('configs') as FormArray
  }

  ngOnInit(): void {
    const lang = this._translocoService.getActiveLang();
    if(lang === 'en'){
      this.checked = false;
    }else{
      this.checked = true;
    }

    this.testService.getContentTest().subscribe(res => {
      console.log(res);
    })
    this.getAll();
  }

  addNewConfigItem(){
    this.configs.push(
      this.fb.group({
        name: [''],
        age: ['']
      })
    )
  }

  deleteConfigItem(index: any){
    this.configs.removeAt(index)
  }

  changePage(e: any) {
   this.pagination.page = e.pageIndex;
   this.pagination.size = e.pageSize;
  }


  addOrEdit(row: any): void {
    console.log(row);
    this.showDialog(AddOrEditComponent, {}, (value: any) => {
      if(value){
        this.getAll();
      }
    })
  }

  delete(row: any): void {
    console.log(row);
    this.showDialog(ConfirmDialogComponent, {}, (value: any) => {
      if(value){
        this.getAll();
      }
    })
  }

  setLanguage() {
    this.checked = !this.checked;
    this._translocoService.setActiveLang(this.checked ? 'vi' : 'en');
  }
}
