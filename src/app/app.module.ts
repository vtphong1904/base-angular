import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EnvServiceProvider} from './config-env/env.service.provider';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    providers: [EnvServiceProvider],
    bootstrap: [AppComponent]
})
export class AppModule {
}
