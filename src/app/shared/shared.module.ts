import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ErrorMessageInputComponent } from './components/error-message-input/error-message-input.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TdTableDefaultComponent } from './components/data-table/td-table-default/td-table-default.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

import { HasAnyAuthorityDirective } from './directives/has-any-authority.directive';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { ControlDisabledDirective } from './directives/control-disabled.directive';

import {MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {TranslocoCoreModule} from '@app/core/transloco/transloco.module';

export const MatModules = [
  MatPaginatorModule,
  MatIconModule,
  MatTableModule,
  MatButtonModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSlideToggleModule
];
export const directives = [
  HasAnyAuthorityDirective,
  OnlyNumberDirective,
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MatModules,
    TranslocoCoreModule
  ],
    declarations: [
    ErrorMessageComponent,
    ErrorMessageInputComponent,
      ...directives,
    DataTableComponent,
    ConfirmDialogComponent,
    SnackBarComponent,
    TooltipDirective,
    TdTableDefaultComponent,
    ControlDisabledDirective,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MatModules,
    DataTableComponent,
    TooltipDirective,
    TdTableDefaultComponent,
    ControlDisabledDirective
  ],
})
export class SharedModule {}
