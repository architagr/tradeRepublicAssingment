import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IStockItem } from 'src/app/models/stock-model';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent {
  @Input('item') item: IStockItem = { name: '', id: '', subscribed: false, prices: [] };
  @Output('select') selectStock: EventEmitter<IStockItem> = new EventEmitter();
  @Output('subscribe') subscribeStock: EventEmitter<IStockItem> = new EventEmitter();
  @Output('unsubscribe') unsubscribeStock: EventEmitter<IStockItem> = new EventEmitter();

  // get currentPrice(): number | null {
  //   if (this.item.prices!.length > 0)
  //     return this.item.prices![0].price;

  //   return null
  // }
  constructor() { }

  priceChange(): boolean {
    return !!this.item.prices && this.item.prices!.length>1 && this.item.prices![0].price >= this.item.prices![1].price
  }
  subscribeEvent() {
    this.subscribeStock.emit(this.item)
  }
  unsubscribeEvent() {
    this.unsubscribeStock.emit(this.item)
  }
}
