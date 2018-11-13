import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
//import { WebsocketService } from './websocket.service';
import 'rxjs/add/operator/map';
import * as io from '../../../node_modules/socket.io-client/dist/socket.io.js';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'https://socketchat-demo.herokuapp.com:5000/';
  // private url = 'http://localhost:5000/';
  private socket:any;

  sendMessage(message:string, username:string){
    this.socket.emit('add-message', message,username);
  }

  getMessages(){
    let observable = new Observable( (observer:any) => {
      this.socket = io(this.url);
      this.socket.on('message', (data:any) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }

  setUsername(username:string){
    console.log('username set:' + username);
     
  }

  // messages : Subject<any>;
  // constructor( 
  //   private wsService: WebsocketService
  // ) {
  //   this.messages = <Subject<any>>wsService
  //   .connect()
  //   .map(
  //       (response: any) : any => {
  //       return Response;
  //     }
  //   )
  //  }

  //  sendMsg(msg){
  //    this.messages.next(msg);
  //  }


}
