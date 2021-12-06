import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContainerDirective } from './container.directive';
import { CurrentWidthComponent } from './current-width/current-width.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerDirective,
    CurrentWidthComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
