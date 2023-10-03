import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvServiceProvider } from './config-env/env.service.provider';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TestComponent } from './module/admin/test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddOrEditComponent } from './module/admin/test/add-or-edit/add-or-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AddOrEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
