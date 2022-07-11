import { Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {

  @Input()
  public controlName: string;
  @Input() name: string ='Trường này'
  errorMessage = {
    required: (name: any, error: any) => `${name} là trường bắt buộc`,
    maxlength: (name: any, error: any) =>
      `${name} có tối đa ${error.maxlength.requiredLength} ký tự`,
  };
  constructor(@Optional() private controlContainer: ControlContainer) {}

  get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  get control(): FormControl {
    return this.form.get(this.controlName) as FormControl;
  }

  get getListError() {
    return Object.keys(this.errorMessage).map((item) => {
      if (this.control.hasError(item)) {
        return this.errorMessage[item](this.name, this.control.errors);
      }
    });
  }

}
