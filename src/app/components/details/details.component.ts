import { Component, OnInit } from '@angular/core';
import { IStockItem, IStockPrice } from 'src/app/models/stock-model';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  selectedStock: IStockItem | null = null;
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.selectedStock.subscribe(data => {
      this.selectedStock = data;
    })
  }
  getOrderedPrices(): IStockPrice[] | undefined {
    return this.selectedStock!.prices?.sort((a, b) => { return a.updateTimestamp > b.updateTimestamp ? -1 : 1 });
  }
}
