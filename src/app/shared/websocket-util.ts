import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

export class WebsocketUtil{
  websocketEndpoint: string;
  topic: string = '/topic/view_log';
  stompClient: any;
  connectStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    // this.websocketEndpoint = `${environment.apiUrl}/ws`;
    this.websocketEndpoint = 'wss://ws.finnhub.io?token=bsr37a748v6tucpfplbg';
  }

  connect(){
    const ws = new SockJS(this.websocketEndpoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    const _this = this;
    _this.stompClient.connect({}, () => {
      _this.stompClient.reconnect_delay = 2000;
      _this.connectStatus.next(true);
    }, (error: any) => this.errorCallBack(error))
  }

  subscribeTopic(processId: any, object: any){
    return this.stompClient.subscribe(`${this.topic}.${processId}`, (res: any) => {
      object.message = JSON.parse(res.body).payload;
    })
  }

  disconnect(){
    if(this.stompClient !== null){
      this.stompClient.disconnect();
    }
  }

  errorCallBack(error: any){
    setTimeout(() => {
      this.disconnect();
    }, 5000)
  }

  send(id: any){
    this.stompClient.send('/socket/hello', {}, id)
  }
}
