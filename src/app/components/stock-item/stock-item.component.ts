import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStockItem } from 'src/app/models/stock-model';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {
  @Input('item') item: IStockItem = { name: '', id: '', subscribed: false, prices: [] };
  @Output('select') selectStock: EventEmitter<IStockItem> = new EventEmitter();

  get currentPrice(): number{
    var sortedData = this.item.prices?.sort((a, b) => { return a.updateTimestamp > b.updateTimestamp ? -1 : 1 });
    return sortedData![0].price;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
