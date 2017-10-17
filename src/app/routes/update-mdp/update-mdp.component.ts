import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PASSWORD_VALIDATOR} from '../../validators/password.validator';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../services/config.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Md5} from 'ts-md5/dist/md5';
import {NavigatorService, PATH_LOGIN} from '../../services/navigator.service';

@Component({
  selector: 'app-update-mdp',
  templateUrl: './update-mdp.component.html',
  styleUrls: ['./update-mdp.component.scss']
})
export class UpdateMdpComponent implements OnInit {

  constructor(private config: ConfigService,
              private http: HttpClient,
              private authService: AuthenticationService,
              private nav: NavigatorService, ) {
  }

  password = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_VALIDATOR)]);
  newPassword = new FormControl('', [Validators.required]);
  hide = false;
  token = '';


  ngOnInit() {
    this.token = window.location.pathname.split(this.config.API_ROUTES.UPDATEPASSWORD)[1];
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Saisissez password' : '';
  }

  getPasswordConfirmationErrorMessage() {
    return this.newPassword.hasError('required') ? 'Confirmez password' : '';
  }

  updatePassword() {
    this.http.get(`${this.config.API_BASE}${this.config.API_ROUTES.UTILISATEURS}` +
      `${this.authService.getUserIdFromToken(this.token)}`).subscribe(
      (utilisateur) => {
        const newUserData = {
          idUtilisateur: utilisateur['idUtilisateur'],
          email: utilisateur['email'],
          motDePasse: Md5.hashStr(this.password.value).toString(),
          newIdContact: utilisateur['contact']['idContact'],
        };

        this.http.put(`${this.config.API_BASE}${this.config.API_ROUTES.UTILISATEURS}`, newUserData).subscribe(
          (response) => {

            this.nav.router.navigate([PATH_LOGIN]);
          },
          (error) => console.log(error));
      },
      (error) => console.log(error)
    );

  }
}
