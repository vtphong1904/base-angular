import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ErrorMessageInputComponent } from './components/error-message-input/error-message-input.component';
import { HasAnyAuthorityDirective } from './directives/has-any-authority.directive';

export const MatModules = [
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...MatModules,
    ],
    declarations: [
    ErrorMessageComponent,
    ErrorMessageInputComponent,
    HasAnyAuthorityDirective,
  ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class SharedModule {}
