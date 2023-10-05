import {Directive, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '([formControlName], [formControl])[appControlDisabled]'
})
export class ControlDisabledDirective {

  @Input() set appControlDisabled(state: boolean){
    setTimeout(() => {
      if(state){
        this.ngControl?.control?.disable();
      }else{
        this.ngControl?.control?.enable();
      }
    }, )
  }
  constructor(private readonly ngControl: NgControl) { }

}
