import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-td-table-default',
  templateUrl: './td-table-default.component.html',
  styleUrls: ['../data-table.component.scss']
})
export class TdTableDefaultComponent implements OnInit {

  @Input() text: any;
  constructor() { }

  ngOnInit(): void {
  }

}
