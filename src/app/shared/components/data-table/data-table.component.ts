import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef} from '@angular/core';
export interface IColumnTable {
  columnDef: string,
  header?: string,
  cellRenderer?: any,
  flex?: number,
  actions?: any
}

export interface IPagination {
  size: number,
  total: number,
  page: number,
  isShow?: boolean
}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() rows: any = [];
  @Input() columns: IColumnTable[] = [];
  @Input() pagination: IPagination;
  @Input() rowTemplate: TemplateRef<any>;
  @Output() pageChange = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();
  actions = [
    {
      id: 'delete',
      label: 'Delete',
      icon: 'heroicons_outline:trash',
      color: 'red',
      role: 'DELETE'
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: 'heroicons_outline:pencil-alt',
      color: 'orange',
      role: 'UPDATE'
    },
    {
      id: 'lock',
      label: 'Lock',
      icon: 'heroicons_outline:lock-closed',
      color: 'red',
    },
    {
      id: 'resetPassword',
      label: 'Reset Password',
      icon: 'heroicons_outline:refresh',
      color: 'red',
    },
    {
      id: 'view',
      label: 'View',
      icon: 'heroicons_outline:eye',
      color: 'primary',
      role: 'READ'
    }
  ];
  displayedActions: any[] = [];

  get displayedColumns(): any {
    return this.columns.map(c => c.columnDef);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getListActions();
  }

  changePage(e: any): void {
    this.pageChange.emit(e);
  }

  calcColumnWidth(column: any): any {
    const totalFlex = this.columns?.reduce((total, col) => (col.flex ?? 1) + total, 0);
    return (column.flex ?? 1) / totalFlex + '%';
  }

  getRowIndex(row: any): any {
    return this.rows.indexOf(row) + this.pagination?.size * this.pagination?.page;
  }

  getListActions(): any {
    this.displayedActions = this.columns
      ?.find(col => col.columnDef === 'action')
      ?.actions?.map((act: any) => this.actions.find(a => a.id === act));
  }

  emitAction(actionType: any, rowData: any): void {
    const data = {
      type: actionType,
      data: rowData,
    };
    this.action.emit(data);
  }

}
