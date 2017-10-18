import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

// Services
import { ConfigService } from '../../services/config.service';
import { AuthenticationService } from '../../services/authentication.service';
import {  NavigatorService,
          PATH_FORGOT_PASSWORD } from '../../services/navigator.service';

@Component({
  selector: 'app-demande-mdp',
  templateUrl: './demande-mdp.component.html',
  styleUrls: ['./demande-mdp.component.scss']
})
export class DemandeMdpComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  loading = false;
  forgotPasswordMessage: string;

  constructor(
    public config: ConfigService,
    public nav: NavigatorService,
    public authService: AuthenticationService,
  ) { }

  ngOnInit() {
  }


  demandeMDP(): void {
    if (this.email.valid) {
      this.loading = true;
      this.authService.forgotPassword(this.email.value).then(
        (forgotPasswordAttempt: string) => {
        this.forgotPasswordMessage = forgotPasswordAttempt;
        this.loading = false;
        }, (error: string) => {
        this.forgotPasswordMessage = error;
        this.loading = false;
      });
    }
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Vous devez saisir votre email' :
      this.email.hasError('email') ? 'Email non valide' : '';
  }

}
