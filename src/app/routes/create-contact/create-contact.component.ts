import { Component, OnInit } from '@angular/core';
import { Profil } from '../../models/Profil';
import { FormControl, Validators } from '@angular/forms';
import { ProfilService } from '../../services/profil.service';
import { AuthenticationService } from '../../services/authentication.service';
import {  NavigatorService, PATH_CONTACTS } from '../../services/navigator.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  selectedValue: number;
  formcreateContactMessage : string;
  authenticating = false;

  profils : Array<Profil> = [];


  email = new FormControl('', [Validators.required, Validators.email]);
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

  createContact(): void {
    this.formcreateContactMessage ="";
    if (this.email.valid &&  this.nom.valid && this.prenom.valid && this.numTel.valid) {
      
      this.authService.authenticateFormContact(this.email.value,this.nom.value, this.prenom.value, this.selectedValue,this.gravatar, this.adresse, this.codePostal,
        this.ville, this.numTel.value
      ).then(
        (loginAttempt: string) => {
        this.formcreateContactMessage = loginAttempt;
        this.authenticating = false;
        if (this.authService.isAuthenticated) {
          this.nav.router.navigate([PATH_CONTACTS]);
        }
        }, (error: string) => {
        this.formcreateContactMessage = error;
        this.authenticating = false;
      });

    }
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Vous devez saisir votre email' :
      this.email.hasError('email') ? 'Email non valide' : '';
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
    this.formcreateContactMessage ="";
    this.nav.router.navigate([PATH_CONTACTS]);
  }

}
