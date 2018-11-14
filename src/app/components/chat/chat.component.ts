import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalDirective } from 'angular-bootstrap-md';


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
  profile:any;

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
          console.log(user['username']);
          this.users = user['username'];
          this.onlineUsers  = (this.users).length;
        });

    this.connection = this._chatservice.getMessages().subscribe(
      message => {
        console.log(message);
        this.messages.push(message);
      });

      // if (this._authService.userProfile) {
      //   this.profile = this._authService.userProfile;
      //   console.log(this.profile);
      // } else {
      //   this._authService.getProfile((err, profile) => {
      //     this.profile = profile;
      //   });
      // } 


  }

  startChat(){
    this.basicModal.hide();
    this.username = this.usernameform.value['username'];
    this._chatservice.userConnect(this.username);
  }

  ngAfterViewInit() {
    this.basicModal.show();
  }

  ngOnDestroy(){
    this.connection.unsubscribe();
  }

  sendMessage(event){
    if (event.key === "Enter") {
      console.log(event);
      this.chatmessage = this.signupForm.value['chatmessage'];
      

      this._chatservice.sendMessage(this.chatmessage,this.username);
      this._chatservice.setUsername(this.username);
      this.chatmessage = '';
      this.initformval(this.chatmessage,this.username);

      console.log(this.username);
    }
    
  }

  initformval(message,username){
    this.signupForm = new FormGroup({
      'chatmessage' : new FormControl(message,Validators.required),
      'username' : new FormControl(username,Validators.required)
    })
    this.usernameform = new FormGroup({
      'username' : new FormControl(username,Validators.required)
    })
  }

}
