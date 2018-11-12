import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'socketchat';

  constructor(
    private chat: ChatService
  ) {

  }

  ngOnInit() {
    // this.chat.messages.subscribe(
    //   msg => {
    //     console.log(msg);
    //   }
    // )

  }

  // senMessage() {
  //   this.chat.sendMsg("test message");
  // }
}
