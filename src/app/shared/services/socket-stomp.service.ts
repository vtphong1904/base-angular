import { Injectable } from '@angular/core';
import {Client, Stomp} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class SocketStompService {
  // client: Client;

  constructor() {
    // this.connect();
  }

  // connect() {
  //   const socket = new SockJS('wss://ws.finnhub.io?token=bsr37a748v6tucpfplbg'); // Điều chỉnh URL WebSocket của bạn
  //   // this.client = Stomp.over(socket);
  // }

  /*reconnect() {
    console.log('Attempting to reconnect...');
    setTimeout(() => {
      this.connect();
    }, 5000); // Chờ 5 giây trước khi thử kết nối lại
  }

  sendMessage(body: any) {
    this.client.publish(body);
  }

  subscribe(destination: any, callback: (message: any) => void) {
    this.client.subscribe(destination, callback);
  }*/
}
