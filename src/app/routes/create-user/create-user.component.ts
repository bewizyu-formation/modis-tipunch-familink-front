import { Component, OnInit } from '@angular/core';
import { Profil } from '../../models/Profil';
import { FormControl, Validators } from '@angular/forms';
import { ProfilService } from '../../services/profil.service';
import { PASSWORD_VALIDATOR } from '../../validators/password.validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {


    selectedValue: string;
  
    profils : Array<Profil> = [];


    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_VALIDATOR)]);
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
      public profilService: ProfilService,
    ) { }
  
    ngOnInit() {
      this.profilService.getProfils().subscribe(
        (response: Array<Profil>) => {
          console.log(response);
          this.profils = response;
        },
        error => console.log(error),
     ); 

    }
  
  
    createUser(): void {
      if (this.email.valid && this.password.valid) {
        
        /*this.authService.authenticate(this.email.value, this.password.value).then(
          (loginAttempt: string) => {
          this.authenticationMessage = loginAttempt;
          this.authenticating = false;
          if (this.authService.isAuthenticated) {
            this.nav.router.navigate([PATH_HOME]);
          }
          }, (error: string) => {
          this.authenticationMessage = error;
          this.authenticating = false;
        });*/
  
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
      return this.password.hasError('required') ? 'Vous devez saisir votre numéro de téléphone' : '';
    }

    getNomErrorMessage() {
      return this.nom.hasError('required') ? 'Vous devez saisir votre nom' :
        this.nom.hasError('minlength') ? 'Minimum 2 caractères' : '';
    }

    getStringErrorMessage(){
      return console.log("erreur numTel");
    }

    navigateToCreateAccount() {
      //this.nav.router.navigate([PATH_CREATE_ACCOUNT]);
    }
  
    navigateToForgotPassword() {
      //this.nav.router.navigate([PATH_FORGOT_PASSWORD]);
    }

}
