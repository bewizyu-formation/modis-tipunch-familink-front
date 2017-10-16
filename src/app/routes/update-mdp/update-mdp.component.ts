import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PASSWORD_VALIDATOR} from '../../validators/password.validator';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../services/config.service';
import {AuthenticationService} from '../../services/authentication.service';
import { Md5 } from 'ts-md5/dist/md5';
import {NavigatorService, PATH_LOGIN} from '../../services/navigator.service';

@Component({
  selector: 'app-update-mdp',
  templateUrl: './update-mdp.component.html',
  styleUrls: ['./update-mdp.component.scss']
})
export class UpdateMdpComponent implements OnInit {

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    public authService: AuthenticationService,
    public nav: NavigatorService, ) { }

  password = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_VALIDATOR)]);
  newPassword = new FormControl('', [Validators.required]);
  hide = true;

  ngOnInit() {
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Saisissez password' : '';
  }

  getPasswordConfirmationErrorMessage() {
    return this.newPassword.hasError('required') ? 'Confirmez password' : '';
  }

  updatePassword() {
    console.log('coucou');

    const postDataObjectToSend = {
      idUtilisateur: 2,
      email: 'celikbas.ahmet@gmail.com',
      motDePasse: Md5.hashStr(this.password.value).toString(),
      IdContact: 3,
    };
    this.http.put(`${this.config.API_BASE}${this.config.API_ROUTES.UTILISATEUR}`, postDataObjectToSend).
    subscribe( (liste) => {
      console.log('COUCOU2LERETOUR')
      console.log(liste);
      this.nav.router.navigate([PATH_LOGIN]);
      },
      (error) => console.log(error));
  }
}
