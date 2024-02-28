import {Injectable} from '@angular/core';
import {WebSocketSubject, WebSocketSubjectConfig} from 'rxjs/internal/observable/dom/WebSocketSubject';
import {
    catchError, delay,
    Observable, retryWhen,
    tap,
    throwError
} from 'rxjs';
import {OpenEvent} from 'sockjs-client';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    public socketConfig: WebSocketSubjectConfig<any> = {
        url: 'wss://ws.finnhub.io?token=bsr37a748v6tucpfplbg',
        openObserver: {
            next: (event: OpenEvent) => {
                this.sendMessage({'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT'})
            }
        },
        closeObserver: {
            next: (event: CloseEvent) => {
                console.log('WebSocket closed:', event);
            },
        },
    };

    public socket: WebSocketSubject<any>;

    constructor() {
        // this.socket = new WebSocketSubject(this.socketConfig);
    }

    connect() {
        this.socket = new WebSocketSubject(this.socketConfig);
    }

    private reconnect(): WebSocketSubject<any> {
        return new WebSocketSubject(this.socketConfig);
    }

    sendMessage(message: any) {
        this.socket?.next(message);
    }

    getMessages(): Observable<any> {
        return this.socket?.asObservable().pipe(
            catchError((error) => {
                console.error('WebSocket error:', error);
                return throwError(error);
            }),
            retryWhen((errors) =>
                errors.pipe(
                    tap(() => {
                        console.log('Reconnect websocket ...')
                    }),
                    delay(5000), // Chờ 5 giây trước khi thử reconnect
                )
            )
        );
    }

    disConnect() {
        this.socket.complete();
    }
}
