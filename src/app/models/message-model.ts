export interface Message {
    isin: string;
    price: number;
    bid: number;
    ask: number;
}


export interface SubscribeMessage {
    subscribe: string;
}

export interface UnSubscribeMessage {
    unsubscribe: string;
}