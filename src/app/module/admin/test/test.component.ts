import {Component, Injector, OnInit} from '@angular/core';
import {IColumnTable, IPagination} from '@shared/components/data-table/data-table.component';
import {BaseComponent} from '@app/core/base.component';
import {TestService} from '@app/module/admin/test/test.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends BaseComponent implements OnInit {
  pagination: IPagination = {
    page: 0,
    size: 5,
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
  constructor(injector: Injector, private testService: TestService) {
    super(injector, testService)
  }

  ngOnInit(): void {
    this.testService.getContentTest().subscribe(res => {
      console.log(res);
    })
    this.getAll();
  }

  changePage(e: any) {
   this.pagination.page = e.pageIndex;
   this.pagination.size = e.pageSize;
  }


  addOrEdit(row: any): void {
    console.log(row)
  }

  delete(row: any): void {
    console.log(row)
  }
}
