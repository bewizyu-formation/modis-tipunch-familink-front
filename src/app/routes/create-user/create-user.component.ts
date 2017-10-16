import { Component, OnInit } from '@angular/core';
import { Profil } from '../../models/Profil';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PASSWORD_VALIDATOR, passwordMatchValidator } from '../../validators/password.validator';
import { NUMTEL_VALIDATOR } from '../../validators/numTel.validator';
import { CODEPOSTAL_VALIDATOR } from '../../validators/codePostal.validator';
import { Md5 } from 'ts-md5/dist/md5';

import { ProfilService } from '../../services/profil.service';
import { ConfigService } from '../../services/config.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NavigatorService, PATH_HOME, PATH_LOGIN } from '../../services/navigator.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

    isProcessing = false;
    formCreateUserMessage = '';
    profils: Array<Profil> = [];

    passwordGroup = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_VALIDATOR)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_VALIDATOR)])
    }, passwordMatchValidator);
    hide = true;

    requieredFormsGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
      prenom: new FormControl('', [Validators.required]),
      profil: new FormControl('', [Validators.required]),
      numTel: new FormControl('', [Validators.required, Validators.pattern(NUMTEL_VALIDATOR)]),
    });

    gravatar = new FormControl('', [Validators.email]);
    adresse = '';
    codePostal = new FormControl('', [Validators.pattern(CODEPOSTAL_VALIDATOR)]);
    ville = '';

    constructor(
      public nav: NavigatorService,
      public config: ConfigService,
      public profilService: ProfilService,
      public authService: AuthenticationService,
    ) { }

    ngOnInit() {
      this.profilService.getProfils()
      .subscribe(
        (response: Array<Profil>) => {
          this.profils = response;
        },
        error => console.log(error),
      );
    }


    createUser(): void {
      this.isProcessing = true;
      this.formCreateUserMessage = '';
      if (this.isFormValid()) {


        const createFormData = {
          email: this.requieredFormsGroup.get('email').value,
          password: Md5.hashStr(this.passwordGroup.get('password').value).toString(),
          passwordConfirm: Md5.hashStr(this.passwordGroup.get('passwordConfirm').value).toString(),
          nom: this.requieredFormsGroup.get('nom').value,
          prenom: this.requieredFormsGroup.get('prenom').value,
          idProfil: this.requieredFormsGroup.get('profil').value,
          gravatar: `${this.config.GRAVATAR_BASE}${Md5.hashStr(this.gravatar.value).toString()}`,
          adresse: this.adresse,
          codePostal: this.codePostal.value,
          numTel: this.requieredFormsGroup.get('numTel').value, // format number (put spaces in phone number)
          ville: this.ville,
        };

        this.authService.createUser(createFormData).then(
          (loginAttempt: string) => {
            this.formCreateUserMessage = loginAttempt;
            this.isProcessing = false;
            if (this.formCreateUserMessage === 'Votre compte a été créé.') {
              setTimeout(() => {
                this.nav.router.navigate([PATH_LOGIN]);
              }, 1000);
            }
          }, (error: string) => {
          this.formCreateUserMessage = error;
          this.isProcessing = false;
        });


      }
    }

    getEmailErrorMessage() {
      return this.requieredFormsGroup.get('email').hasError('required') ? 'Vous devez saisir votre email' :
        this.requieredFormsGroup.get('email').hasError('email') ? 'Email non valide' : '';
    }

    getGravatarErrorMessage() {
      return this.gravatar.hasError('pattern') ? 'Gravatar non valide. Saisir l\'email de votre compte Gravatar' : '';
    }

    getCodePostalErrorMessage() {
      return this.gravatar.hasError('email') ? 'Code postal au format: 12345' : '';
    }

    getPasswordErrorMessage() {
      return this.passwordGroup.get('password').hasError('required') ? 'Vous devez saisir votre mot de passe' :
        this.passwordGroup.get('password').hasError('pattern') ? 'Minimum 6 caractères dont une lettre maj./min. et un chiffre' : '';
    }

    getPasswordConfirmErrorMessage() {
      return this.passwordGroup.get('passwordConfirm').hasError('required') ? 'Vous devez saisir votre mot de passe' :
        this.passwordGroup.get('password').hasError('pattern') ? 'Avec à minima une maj., une min. et un chiffre' :
          this.passwordGroup.hasError('mismatch') ? 'Les deux mots de passes ne sont pas identiques' : '';
    }

    getNumTelErrorMessage() {
      return this.requieredFormsGroup.get('numTel').hasError('required') ? 'Vous devez saisir votre numéro de téléphone' :
        this.requieredFormsGroup.get('numTel').hasError('pattern') ?
          'Format du téléphone non valide (format: 0123456789)' : '';
    }

    getNomErrorMessage() {
      return this.requieredFormsGroup.get('nom').hasError('required') ? 'Vous devez saisir votre nom' :
        this.requieredFormsGroup.get('nom').hasError('minlength') ? 'Minimum 2 caractères' : '';
    }

    getPrenomErrorMessage() {
      return this.requieredFormsGroup.get('prenom').hasError('required') ? 'Vous devez saisir votre prenom' :
      this.requieredFormsGroup.get('prenom').hasError('minlength') ? 'Minimum 2 caractères' : '';
    }

    getProfilErrorMessage() {
      return this.requieredFormsGroup.get('profil').hasError('required') ? 'Vous devez choisir un profil' : '';
    }

    isFormValid(): boolean {
      if (this.gravatar.value.length > 0) {
        return (this.requieredFormsGroup.valid && this.passwordGroup.valid && this.gravatar.valid);
      } else if (this.codePostal.value.length > 0) {
        return (this.requieredFormsGroup.valid && this.passwordGroup.valid && this.codePostal.valid);
      } else {
        return (this.requieredFormsGroup.valid && this.passwordGroup.valid);
      }
    }

    navigateToHome() {
      this.formCreateUserMessage = '';
      this.nav.router.navigate([PATH_HOME]);
    }

}
