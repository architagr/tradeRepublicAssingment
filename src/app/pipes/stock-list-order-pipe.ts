import { Pipe, PipeTransform } from '@angular/core';
import { IStockItem } from '../models/stock-model';

@Pipe({
    name: 'orderBy',
    pure: true
})
export class OrderByPipe implements PipeTransform {

    transform(value: IStockItem[]): any[] {
        return value.sort((a: any, b: any) => { return b.subscribed });
    }

}