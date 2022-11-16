import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../../core/base.component";
import {TestService} from "./test.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends BaseComponent implements OnInit {
  paginate = {
    page: 0,
    size: 5,
    total: 0
  }
  columns: any[] = [
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
      actions: ['view','edit', 'delete'],
    }
  ];
  dataTable = [
    {
      name: 'ABC',
      code: 'abc'
    },
    {
      name: 'ABC',
      code: 'abc'
    },
    {
      name: 'ABC',
      code: 'abc'
    },
    {
      name: 'ABC',
      code: 'abc'
    },
    {
      name: 'ABC',
      code: 'abc'
    },
    {
      name: 'MNP',
      code: 'mnp'
    },
    {
      name: 'MNP',
      code: 'mnp'
    },
    {
      name: 'MNP',
      code: 'mnp'
    },
    {
      name: 'MNP',
      code: 'mnp'
    },
    {
      name: 'MNP',
      code: 'mnp'
    }
  ];
  constructor(injector: Injector, private testService: TestService) {
    super(injector, testService)
  }

  ngOnInit(): void {
    this.getAll();
    console.log(this.dataResponse)
  }

  changePage(e: any) {
   this.paginate.page = e.pageIndex;
   this.paginate.size = e.pageSize;
  }

  actionClick(e: any) {
    console.log(e)
  }
}
