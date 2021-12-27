import { Injectable, OnDestroy } from '@angular/core';
import { delay, filter, map, Observable, of, retryWhen, Subject, switchMap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message, SubscribeMessage, UnSubscribeMessage } from '../models/message-model';
import { IStockItem } from '../models/stock-model';

@Injectable({
    providedIn: 'root'
})
export class StockWebSocketService implements OnDestroy {
    selectedStock: Subject<IStockItem> = new Subject<IStockItem>();
    private socketUrl: string = 'ws://159.89.15.214:8080/'
    connection$: WebSocketSubject<Message | SubscribeMessage | UnSubscribeMessage> | null = null;
    RETRY_SECONDS = 10;

    connect(): Observable<Message | SubscribeMessage | UnSubscribeMessage> {
        return of(this.socketUrl).pipe(
            filter(apiUrl => !!apiUrl),
            // https becomes wws, http becomes ws
            map(apiUrl => apiUrl.replace(/^http/, 'ws')),
            switchMap(wsUrl => {
                if (this.connection$) {
                    return this.connection$;
                } else {
                    this.connection$ = webSocket<Message | SubscribeMessage | UnSubscribeMessage>(wsUrl);
                    return this.connection$;
                }
            }),
            retryWhen((errors) => errors.pipe(delay(this.RETRY_SECONDS)))
        );
    }

    send(data: SubscribeMessage | UnSubscribeMessage) {
        if (this.connection$) {
            this.connection$.next(data);
        } else {
            console.error('Did not send data, open a connection first');
        }
    }

    closeConnection() {
        if (this.connection$) {
            this.connection$.complete();
            this.connection$ = null;
        }
    }
    ngOnDestroy() {
        console.log('disconnected');
        this.closeConnection();
    }
}