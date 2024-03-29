import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ErrorMessageInputComponent } from './components/error-message-input/error-message-input.component';
import { HasAnyAuthorityDirective } from './directives/has-any-authority.directive';
import { DataTableComponent } from './components/data-table/data-table.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";

export const MatModules = [
  MatPaginatorModule,
  MatIconModule,
  MatTableModule,
  MatButtonModule,
  MatSnackBarModule,
  MatDialogModule
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
    DataTableComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableComponent
  ],
})
export class SharedModule {}
