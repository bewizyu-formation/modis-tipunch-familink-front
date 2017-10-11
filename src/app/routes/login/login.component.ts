import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

// Services
import { ConfigService } from '../../services/config.service';
import { AuthenticationService } from '../../services/authentication.service';
import {  NavigatorService,
          PATH_HOME,
          PATH_CREATE_ACCOUNT,
          PATH_FORGOT_PASSWORD } from '../../services/navigator.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  authenticating = false;
  authenticationMessage: string;

  constructor(
    public config: ConfigService,
    public nav: NavigatorService,
    public authService: AuthenticationService,
  ) { }

  ngOnInit() {
  }


  login(): void {
    if (this.email.valid && this.password.valid) {
      this.authenticating = true;
      this.authService.authenticate(this.email.value, this.password.value).then(
        (loginAttempt: string) => {
        this.authenticationMessage = loginAttempt;
        this.authenticating = false;
        if (this.authService.isAuthenticated) {
          this.nav.router.navigate([PATH_HOME]);
        }
        }, (error: string) => {
        this.authenticationMessage = error;
        this.authenticating = false;
      });

    }
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Vous devez saisir votre email' :
      this.email.hasError('email') ? 'Email non valide' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Vous devez saisir votre mot de passe' : '';
  }


  navigateToCreateAccount() {
    this.nav.router.navigate([PATH_CREATE_ACCOUNT]);
  }

  navigateToForgotPassword() {
    this.nav.router.navigate([PATH_FORGOT_PASSWORD]);
  }
}
