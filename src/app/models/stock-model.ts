export interface IStockItem {
    name: string,
    id: string,
    subscribed: boolean;
    prices?: IStockPrice[];
}

export interface IStockPrice {
    price: number;
    ask: number;
    bid: number;
}