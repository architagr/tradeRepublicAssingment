import { Component } from '@angular/core';
import { IStockItem } from 'src/app/models/stock-model';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent {
  stockList: IStockItem[] = [
    {
      name: "test1",
      id: "1",
      subscribed: false
    },
    {
      name: "test2",
      id: "2",
      subscribed: true,
      prices: [{ price: 12, ask: 12.1, bid: 11.9, updateTimestamp: new Date(2021, 11, 10, 0, 0, 0, 0).getTime() }, { price: 11.9, ask: 12.1, bid: 11.8, updateTimestamp: new Date(2021, 11, 10, 0, 0, 0, 10).getTime() }]
    },
    {
      name: "test3",
      id: "3",
      subscribed: false
    },
    {
      name: "test4",
      id: "4",
      subscribed: true,
      prices: [{ price: 22, ask: 22.1, bid: 21.9, updateTimestamp: new Date(2021, 11, 10, 0, 0, 0, 0).getTime() }, { price: 21.9, ask: 22.1, bid: 21.8, updateTimestamp: new Date(2021, 11, 10, 0, 0, 0, 0).getTime() }]
    }
  ];
  constructor(private stockService: StockService) { }

  selectStock(stock: IStockItem) {
    this.stockService.selectedStock.next(stock)
  }
}
