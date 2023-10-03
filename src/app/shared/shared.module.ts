import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ErrorMessageInputComponent } from './components/error-message-input/error-message-input.component';
import { DataTableComponent } from './components/data-table/data-table.component';

import { HasAnyAuthorityDirective } from './directives/has-any-authority.directive';

import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { OnlyNumberDirective } from './directives/only-number.directive';

export const MatModules = [
  MatPaginatorModule,
  MatIconModule,
  MatTableModule,
  MatButtonModule,
  MatSnackBarModule,
  MatDialogModule
];
export const directives = [
  HasAnyAuthorityDirective
]
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
      ...directives,
    DataTableComponent,
    ConfirmDialogComponent,
    OnlyNumberDirective,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MatModules,
    DataTableComponent
  ],
})
export class SharedModule {}
