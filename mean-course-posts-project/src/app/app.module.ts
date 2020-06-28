import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from 'src/shared/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './common/components/spinner/spinner.component';
import { WarningComponent } from './common/components/warning/warning.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SpinnerComponent,
    WarningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
  ],
  entryComponents: [
    SpinnerComponent,
    WarningComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
