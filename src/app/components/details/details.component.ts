import { Component, OnInit } from '@angular/core';
import { IStockItem } from 'src/app/models/stock-model';
import { StockWebSocketService } from 'src/app/services/stock-web-socket.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  selectedStock: IStockItem | null = null;
  constructor(private webSocket: StockWebSocketService) { }

  ngOnInit(): void {
    this.webSocket.selectedStock.subscribe(data => {
      this.selectedStock = data;
    })
  }
}
