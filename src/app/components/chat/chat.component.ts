import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: any = [];
  signupForm: FormGroup;
  chatmessage:string;
  username:string;
  connection :any;
  alert: any = false;
  profile:any;

  constructor(
    private _chatservice: ChatService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.initformval(null,null);
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

  ngOnDestroy(){
    this.connection.unsubscribe();
  }

  sendMessage(event){
    if (event.key === "Enter") {
      console.log(event);
      this.chatmessage = this.signupForm.value['chatmessage'];
      this.username = this.signupForm.value['username'];

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
  }

}
