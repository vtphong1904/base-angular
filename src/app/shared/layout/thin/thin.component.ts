import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thin',
  templateUrl: './thin.component.html',
  styleUrls: ['./thin.component.scss']
})
export class ThinComponent implements OnInit {
  listNavigation = [
    {
      id: 1,
      label: 'Base',
      link: 'test'
    },
    {
      id: 2,
      label: 'Justina Xie',
      link: 'justina-xie'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
