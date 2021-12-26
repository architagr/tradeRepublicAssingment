import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IStockItem } from "../models/stock-model";


@Injectable({
    providedIn: 'root',
  })
export class StockService{

    selectedStock: Subject<IStockItem> = new Subject<IStockItem>();
}