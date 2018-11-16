import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalDirective } from 'angular-bootstrap-md';
//const stringify = require('json-stringify-safe')

// heroku login
// heroku git:remote -a socketchat-demo
// git add .
// git commit -am "make it better60"
// git push heroku master

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy,AfterViewInit {
  @ViewChild('frame') basicModal: ModalDirective;

  messages: any = [];
  users: any = [];
  signupForm: FormGroup;
  usernameform: FormGroup;
  chatmessage:string;
  username:string;
  connection :any;
  connection2 : any;
  alert: any = false;
  userid: any;
  onlineUsers:number;

  constructor(
    private _chatservice: ChatService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.initformval(null,null);
    this._chatservice.getUsersConnected()
      .subscribe(
        user => {
          console.log(user);
          this.users = user['username'];
          this.onlineUsers  = (this.users).length;
        });

    this.connection = this._chatservice.getMessages().subscribe(
      message => {
        this.messages.push(message);
      });

      this._chatservice.sockid()
      .subscribe(
        (data) => {
          this.userid = data['id'];
          console.log(data);
        }
      )
  }

  startChat(){
    this.basicModal.hide();
    this.username = this.usernameform.value['username'];
    this._chatservice.userConnect(this.username);
    this._chatservice.setId(this.username);
   
  }

  ngAfterViewInit() {
    this.basicModal.show();
    this.basicModal.onEsc();
  }

  ngOnDestroy(){
    this.connection.unsubscribe();
  }

  sendMessage(event,userid){
    
    if (event.key === "Enter") {
      console.log('send message');
      console.log(userid);
  //    console.log(event);
      this.chatmessage = this.signupForm.value['chatmessage'];
      

      this._chatservice.sendMessage(this.chatmessage,this.username,userid);
      this._chatservice.setUsername(this.username);
      this.chatmessage = '';
      this.initformval(this.chatmessage,this.username);

      console.log(this.username);
    }
    
  }

  initformval(message,username){
    this.signupForm = new FormGroup({
      'chatmessage' : new FormControl(message,Validators.required)
    })
    this.usernameform = new FormGroup({
      'username' : new FormControl(username,[Validators.required,this.noWhitespaceValidator,Validators.maxLength(10)])
    })
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

}
