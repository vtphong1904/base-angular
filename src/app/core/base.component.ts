import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-base',
    template: ``,
    styles: []
})
export class BaseComponent implements OnInit {
    // write common method
    public fb: FormBuilder;

    constructor(injector: Injector) {
        this.fb = injector.get(FormBuilder);
    }

    ngOnInit(): void {
    }
}
