import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username:string;
  constructor(
    private _authservice:AuthService,
    private _chatservice: ChatService
  ) { 
    _authservice.handleAuthentication();
  }

  ngOnInit() {
    this._chatservice.sockid()
      .subscribe(
        (data) => {
          this.username = data['id'];
          console.log(data);
        }
      )
  }

  login(){
    this._authservice.login();
  }

  logout(){
    this._authservice.logout();
  }

  autho(){
    return this._authservice.isAuthenticated();
  }


}
