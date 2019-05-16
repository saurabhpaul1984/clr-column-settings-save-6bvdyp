import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ColumnToggleSettingsComponent } from './column-toggle-settings/column-toggle-settings.component'

import { ClarityModule, ClrFormsNextModule } from '@clr/angular';

import { AppComponent } from './app.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, ClarityModule, HttpClientModule,
    HttpClientXsrfModule, FormsModule, ClrFormsNextModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),],
  declarations: [AppComponent, ColumnToggleSettingsComponent],
  bootstrap: [AppComponent],
  exports: [
    TranslateModule,
    TranslatePipe,
  ],
})
export class AppModule { }
