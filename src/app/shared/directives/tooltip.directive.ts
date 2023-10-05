import {AfterViewInit, Directive, ElementRef, HostListener} from '@angular/core';
import {MatTooltip} from '@angular/material/tooltip';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements AfterViewInit{

  constructor(private matTooltip: MatTooltip, private elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    element.style.display = 'block';
    element.style.textOverflow = 'ellipsis';
    element.style.whiteSpace = 'nowrap';
    element.style.overflow = 'hidden';
  }

  @HostListener('mouseenter', ['$event']) setTooltipState(){
    this.matTooltip.disabled = true;
    const element = this.elementRef.nativeElement;
    if(element.offsetWidth < element.scrollWidth){
      this.matTooltip.message = element.innerText;
      this.matTooltip.disabled = false;
    }
  }

}
