import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Message } from 'src/app/models/message-model';
import { IStockItem } from 'src/app/models/stock-model';
import { StockWebSocketService } from 'src/app/services/stock-web-socket.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit, OnDestroy {
  stockList: IStockItem[] = [
    {
      name: "Tata Power",
      id: "DE000BASF111",
      subscribed: false
    },
    {
      name: "Tata Motor",
      id: "DE000BASF112",
      subscribed: false,
    },
    {
      name: "Infosys",
      id: "DE000BASF113",
      subscribed: false
    },
    {
      name: "Cognizant",
      id: "DE000BASF114",
      subscribed: false,
    },
    {
      name: "Tech M",
      id: "DE000BASF115",
      subscribed: false
    },
    {
      name: "Air Bus",
      id: "DE000BASF116",
      subscribed: false
    },
    {
      name: "Wipro",
      id: "DE000BASF117",
      subscribed: false
    }
  ];

  destroyed$ = new Subject<string>();
  constructor(private webSocket: StockWebSocketService) {
  }

  ngOnInit() {
    this.webSocket.connect().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(messages => {
      const data = (messages as Message);
      const stock = this.stockList.find(x => x.id === data.isin);

      if (stock) {
        if (!stock.prices) {
          stock.prices = [];
        }
        stock.prices?.unshift({ price: data.price, ask: data.ask, bid: data.bid })
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next('');
  }

  selectStock(stock: IStockItem) {
    this.webSocket.selectedStock.next(stock)
  }

  subscribeStock(item: IStockItem) {
    const stock = this.stockList.find(x => x.id === item.id);
    stock!.subscribed = true;

    this.webSocket.send({ subscribe: item.id });
  }
  unsubscribeStock(item: IStockItem) {
    const stock = this.stockList.find(x => x.id === item.id);
    stock!.subscribed = false;

    this.webSocket.send({ unsubscribe: item.id });
  }
}
