import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, AbstractControlDirective, AsyncValidatorFn, ValidatorFn} from '@angular/forms';
import {catchError, map, of, switchMap, timeout, timer} from 'rxjs';
import {RESPONSE_CODE_SUCCESS} from '@shared/constants/app.constant';

@Component({
  selector: 'app-error-message-input',
  templateUrl: './error-message-input.component.html',
  styleUrls: ['./error-message-input.component.scss']
})
export class ErrorMessageInputComponent {

  @Input() control!: AbstractControlDirective | AbstractControl | any;
  @Input() name = 'Trường này';
  @Input() textPattern: any;

  private errorMessages: { [key: string]: any } = {
    required: (params: any, name: any) => `${name} là trường bắt buộc`,
    pattern: (params: any, name: any) => `${this.textPattern ? this.textPattern : name + ' Không đúng định dạng'}`,
    email: (params: any, name: any) => `${name} Không đúng định dạng`,
    max: (params: any, name: any) => `${name} không đúng định dạng`,
    min: (params: any, name: any) => `${name} không đúng định dạng`,
    dateValid: (params: any, name: any) => `${name} phải lớn hơn ngày bắt đầu`,
    minlength: (params: any, name: any) => `Length of ${name} can not lower than ${params.requiredLength} characters`,
    maxlength: (params: any, name: any) => `Length of ${name} can not exceed ${params.requiredLength} characters`,
    minNumber: (params: any, name: any) => `Value of ${name} can not lower than ${params.message}`,
    maxNumber: (params: any, name: any) => `Value of ${name} can not exceed ${params.message}`,
    uniqueName: (params: any, name: any) => params.message,
    mustMatch: () => `Mật khẩu không trùng khớp`,

    errMultiEmail: (params: any, name: any) => `${name} không đúng định dạng`,
    asyncDuplicate: (params: any, name: any) => `${name} đã tồn tại`,
    isWhiteSpace: (params: any,name: any) => `${name} không được bỏ trống`,
    validEndAt: (params: any, name: any) => `${name} phải lớn hơn ${params?.field}`

  };

  shouldShowErrors(): boolean {
    return this.control?.errors && (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors).map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any): any {
    return this.errorMessages[type](params, this.name);
  }

}

/*Async Duplicate*/
export const checkDuplicateUsername = (api: any): AsyncValidatorFn => {
  return (control: AbstractControl) => {
    return timer(500).pipe(
    // @ts-ignore
      switchMap(() => api.duplicateUsername().pipe(
        timeout(5000),
        map((res: any) => {
          if(res.code === RESPONSE_CODE_SUCCESS){
            if(!res.data){
              return {asyncDuplicate: true}
            }else{
              return null;
            }
          }else{
            return null;
          }
        }),
        catchError(err => of(null))
      )),
      catchError(err => of(null))
    )
  }
}

/*Check list email*/
export function multipleEmail(): ValidatorFn {
  return (control: AbstractControl) => {
    const multi = control?.value?.split(',');
    const pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const check = multi?.every((m: any) => pattern.test(m.trim()));
    if (check) {
      return null;
    } else {
      return {errMultiEmail: true}
    }
  }
}

/*Check character white space*/
export function isWhiteSpace(): ValidatorFn {
  return (control: AbstractControl) => {
    if (control?.value?.toString()?.trim().length === 0) {
      return {isWhiteSpace: true};
    } else {
      return null;
    }
  }
}
/*Check end date bigger then start date*/
export function validateEndAt(key: string, date?: any): ValidatorFn{
  return (control: AbstractControl) => {
    const endTime = (new Date(control?.value)).getTime();
    const beginTime = (new Date(control?.parent?.value[key])).getTime();
    return endTime <= beginTime ? {validEndAt: {field: key}} : null;
  }
}
