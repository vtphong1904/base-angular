import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() rows: any = [];
  @Input() columns: any[] = [];
  @Input() limit: any = 10;
  @Input() count: any = 0;
  @Input() columnWidth: string;
  @Input() paginate: boolean = true;
  @Input() actionTemplate: TemplateRef<any>;
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
  displayedInput = [];

  get displayedColumns(): any {
    return this.columns.map(c => c.columnDef);
  }

  constructor(private cdk: ChangeDetectorRef) {
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
    if (this.columnWidth) {
      return this.columnWidth;
    }
    const totalFlex = this.columns?.reduce((total, col) => (col.flex ?? 1) + total, 0);
    return (column.flex ?? 1) / totalFlex + '%';
  }


  getRowIndex(row: any): any {
    return this.rows.indexOf(row);
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
