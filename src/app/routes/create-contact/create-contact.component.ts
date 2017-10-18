import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Profil } from '../../models/Profil';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NUMTEL_VALIDATOR } from '../../validators/numTel.validator';
import { CODEPOSTAL_VALIDATOR } from '../../validators/codePostal.validator';
import { Md5 } from 'ts-md5/dist/md5';

import { ProfilService } from '../../services/profil.service';
import { ConfigService } from '../../services/config.service';
import { ContactService } from '../../services/contact.service';
import {NavigatorService, PATH_GROUP_SELECTION, PATH_HOME, PATH_LOGIN} from '../../services/navigator.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {


  isProcessing = false;
  formCreateContactMessage = '';
  profils: Array<Profil> = [];

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
    private route: ActivatedRoute,
    public config: ConfigService,
    public profilService: ProfilService,
    public contactService: ContactService,
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
    this.isProcessing = true;
    this.formCreateContactMessage = '';
    if (this.isFormValid()) {
      const createFormData = {
        email: this.requieredFormsGroup.get('email').value,
        nom: this.requieredFormsGroup.get('nom').value,
        prenom: this.requieredFormsGroup.get('prenom').value,
        idProfil: this.requieredFormsGroup.get('profil').value,
        gravatar: `${this.config.GRAVATAR_BASE}${Md5.hashStr(this.gravatar.value).toString()}`,
        adresse: this.adresse,
        codePostal: this.codePostal.value,
        numTel: this.requieredFormsGroup.get('numTel').value, // format number (put spaces in phone number)
        ville: this.ville,
      };

      const createFormData2 = {
        nom: this.requieredFormsGroup.get('nom').value,
        prenom: this.requieredFormsGroup.get('prenom').value,
        gravatar: `${this.config.GRAVATAR_BASE}${Md5.hashStr(this.gravatar.value).toString()}`,
        numTel: this.requieredFormsGroup.get('numTel').value,
        adresse: this.adresse,
        codePostal: this.codePostal.value,
        ville: this.ville,
        email: this.requieredFormsGroup.get('email').value,
        idProfil: this.requieredFormsGroup.get('profil').value,
      };




      const idGroupe = parseInt(this.route.snapshot.paramMap.get('idGroupe'), 10);
      this.contactService.createContact(idGroupe, createFormData2).then(
        (loginAttempt: string) => {
          this.formCreateContactMessage = loginAttempt;
          this.isProcessing = false;
          if (this.formCreateContactMessage === 'Contact créé.') {
            setTimeout(() => {
              this.nav.router.navigate([`${PATH_GROUP_SELECTION}/${idGroupe}`]);
            }, 1000);
          }
        }, (error: string) => {
          this.formCreateContactMessage = error;
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
      return (this.requieredFormsGroup.valid && this.gravatar.valid);
    } else if (this.codePostal.value.length > 0) {
      return (this.requieredFormsGroup.valid && this.codePostal.valid);
    } else {
      return (this.requieredFormsGroup.valid);
    }
  }

  navigateToHome() {
    this.formCreateContactMessage = '';
    this.nav.router.navigate([PATH_HOME]);
  }

}
