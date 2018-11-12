import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _authservice:AuthService) { 
    _authservice.handleAuthentication();
  }

  ngOnInit() {
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
