import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { ViewModeComponent } from './view-mode/view-mode.component';
import { HeaderComponent } from './header/header.component';
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ViewModeComponent,
    HeaderComponent,
    ChartDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
