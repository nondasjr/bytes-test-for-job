import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';


import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { OrdersComponent } from './modules/orders/orders.component';
import { TimerControlComponent } from './modules/timer-control/timer-control.component';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    TimerControlComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
