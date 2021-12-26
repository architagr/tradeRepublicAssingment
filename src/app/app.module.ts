import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockItemComponent } from './components/stock-item/stock-item.component';
import { HomeComponent } from './components/home/home.component';
import { OrderByPipe } from './pipes/stock-list-order-pipe';
import { DetailsComponent } from './components/details/details.component';
import { StockService } from './services/stock.service';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StockListComponent,
    StockItemComponent,
    HomeComponent,
    OrderByPipe,
    DetailsComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
