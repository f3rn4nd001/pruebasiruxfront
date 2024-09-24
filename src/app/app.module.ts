import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { objRutas } from './import';
import { MenuComponent } from './Components/Menu/menu/menu.component';
import { objRutasCatalogos } from './importCatalogo';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,

  ],
  imports: [
    BrowserModule,
    objRutas,
    AppRoutingModule,
    BrowserAnimationsModule,
    objRutasCatalogos
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
