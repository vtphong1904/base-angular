import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@app/core/base.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Validators} from '@angular/forms';
import {TestService} from '@shared/services/test.service';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, testService: TestService, dialogRef: MatDialogRef<AddOrEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    super(injector, testService, dialogRef);
  }

  ngOnInit(): void {
    this.initForm();
    this.getDetailById(4, this.convertObj.bind(this))
    this.addNewItem();
  }

  initForm(){
    this.formModel = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      code: [null, Validators.compose([Validators.required])]
    })
  }

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

}
