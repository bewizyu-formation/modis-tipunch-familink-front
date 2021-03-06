import { Component, OnInit } from '@angular/core';
import { PATH_CREATE_ACCOUNT, PATH_LOGIN } from '../../services/navigator.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  path_login = PATH_LOGIN;
  path_create_account = PATH_CREATE_ACCOUNT;

  ngOnInit() {
  }

}
