import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@app/core/base.component';
import {TestService} from '@app/module/admin/test/test.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Validators} from '@angular/forms';

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
    this.getDetailById({name: 'Phong', age: 24})
    this.addItem();
  }

  initForm(){
    this.formModel = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      age: [null, Validators.compose([Validators.required])]
    })
  }

  addTest() {
    this.addItem({name: 'Phong'})
  }
}
