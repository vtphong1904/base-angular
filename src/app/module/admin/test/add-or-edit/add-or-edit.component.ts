import {Component, Inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from '@app/core/base.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Validators} from '@angular/forms';
import {TestService} from '@shared/services/test.service';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent extends BaseComponent implements OnInit, OnDestroy {

  cities3 = [
    {
      id: 1,
      name: 'Vilnius',
      avatar:
        '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x',
    },
    {
      id: 2,
      name: 'Kaunas',
      avatar:
        '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15',
    },
    {
      id: 3,
      name: 'Pavilnys',
      avatar:
        '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15',
    },
    {
      id: 4,
      name: 'Pavilnys',
      avatar:
        '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15',
    },
    {
      id: 5,
      name: 'Pavilnys',
      avatar:
        '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15',
    },
    {
      id: 6,
      name: 'Pavilnys',
      avatar:
        '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15',
    },
  ];

  constructor(injector: Injector, testService: TestService, dialogRef: MatDialogRef<AddOrEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    super(injector, testService, dialogRef);
  }

  ngOnInit(): void {
    this.initForm();
    this.getDetailById(4, this.convertObj.bind(this))
    this.asyncAddOrEditItem();
  }

  initForm(){
    this.formModel = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      code: [null, Validators.compose([Validators.required])]
    })
  }

  addCustomUser = (term: any) => ({ id: term, name: term });
  selectedCityName: any;

  addTest() {
    this.addNewItem({name: 'Phong'})
  }

  convertObj(item: any){
    const temp = {...item}
    if(temp.id === 4){
      temp.name = 'Justina Xie';
      temp.code = 'Xie Chu Ling';
    };
    return temp;
  }

  override ngOnDestroy() {
    console.log('Override destroy method');
  }

}
