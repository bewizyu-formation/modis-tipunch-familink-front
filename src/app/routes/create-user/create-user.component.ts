import { Component, OnInit } from '@angular/core';
import { Profil } from '../../models/Profil';
import { FormControl, Validators } from '@angular/forms';
import { ProfilService } from '../../services/profil.service';
import { PASSWORD_VALIDATOR } from '../../validators/password.validator';
import { AuthenticationService } from '../../services/authentication.service';
import {  NavigatorService, PATH_FORGOT_PASSWORD,PATH_HOME, } from '../../services/navigator.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {


    selectedValue: number;
    formCreateUserMessage : string;
    authenticating = false;
  
    profils : Array<Profil> = [];


    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_VALIDATOR)]);
    confirmpassword = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_VALIDATOR)]);
    confirm = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_VALIDATOR)]);
    hide = true;
    nom = new FormControl('', [Validators.required, Validators.minLength(2)]);
    prenom = new FormControl('', [Validators.required]);
    numTel = new FormControl('', [Validators.required]);
    gravatar :string;
    bool = true  ; 
    adresse : string;
    codePostal :string;
    ville :string;
    
  
    constructor(
      public nav: NavigatorService,
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
      this.formCreateUserMessage ="";
      if (this.email.valid && this.password.valid && this.confirmpassword.valid && 
        (this.password.value == this.confirmpassword.value)) {
        
        this.authService.authenticateFormUser(this.email.value, this.password.value, this.confirmpassword.value,
          this.nom.value, this.prenom.value, this.selectedValue,this.gravatar, this.adresse, this.codePostal,
          this.ville, this.numTel.value
        ).then(
          (loginAttempt: string) => {
          this.formCreateUserMessage = loginAttempt;
          this.authenticating = false;
          if (this.authService.isAuthenticated) {
            this.nav.router.navigate([PATH_FORGOT_PASSWORD]);
          }
          }, (error: string) => {
          this.formCreateUserMessage = error;
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
  
    getNumTelErrorMessage(){
      return this.numTel.hasError('required') ? 'Vous devez saisir votre numéro de téléphone' : '';
    }

    getNomErrorMessage() {
      return this.nom.hasError('required') ? 'Vous devez saisir votre nom' :
        this.nom.hasError('minlength') ? 'Minimum 2 caractères' : '';
    }

    getPrenomErrorMessage(){
      return this.nom.hasError('required') ? 'Vous devez saisir votre prenom' :
      this.nom.hasError('minlength') ? 'Minimum 2 caractères' : '';
    }

    navigateToHome() {
      this.formCreateUserMessage ="";
      this.nav.router.navigate([PATH_HOME]);
    }

}
