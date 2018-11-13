import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
//import { WebsocketService } from './websocket.service';
import 'rxjs/add/operator/map';
import * as io from '../../../node_modules/socket.io-client/dist/socket.io.js';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port; //enable in deploy
  //private url = 'http://localhost:5000/';
  private socket:any;

  sendMessage(message:string, username:string){
    this.socket.emit('add-message', message,username);
  }

  userConnect(username:string){
    this.socket.emit('user-connect',username);
  }

  // userLeave(username:string){
  //   this.socket.emit('user-connect',username);
  // }

  getUsersConnected(){
    let observable = new Observable( (observer:any) => {
      this.socket = io(this.url);
      this.socket.on('user', (data:any) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
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
  

  onlineUsers(){
    let observable = new Observable( (observer:any) => {
      this.socket = io(this.url);
      this.socket.on('numberOfOnlineUsers',
        (data:any)=>{
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        }
    })
    return observable;
  }

  // getUser(){
  //   let observable = new Observable( (observer:any) => {
  //     this.socket = io(this.url);
  //     return this.socket.clients();

  //     // return () => {
  //     //   this.socket.disconnect();
  //     // }
  //   })
  //   return observable;
  // }

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
