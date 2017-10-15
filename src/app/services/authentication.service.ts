import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

import { Utilisateur } from '../models/Utilisateur';
import { Contact } from '../models/Contact';
import { Profil } from '../models/Profil';
import { Groupe } from '../models/Groupe';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {

  public isAuthenticated = false;
  public userInfos: Subject<Utilisateur> = new Subject<Utilisateur>();
  public userOwnedGroup: Subject<Groupe> = new Subject<Groupe>();

  constructor(public config: ConfigService, private http: HttpClient) { }

  authenticate(email: string, password: string) {
    return new Promise((resolve) => {

      const userCredentials = {
        email: email,
        motDePasse: password
      };

      this.http.post(`${this.config.API_BASE}${this.config.API_ROUTES.LOGIN}`, userCredentials).subscribe(
        (response) => {
          if (response['description'] === 'Connexion réussie') {
            window.localStorage.setItem('token', response['token']);
            this.isAuthenticated = true;
            console.log(response);
            const userData: Utilisateur = <Utilisateur>response['userData']['idUtilisateur'];
            const userOwnedGroup: Groupe = new Groupe(  response['userData']['idGroupe'],
                                                        response['userData']['nom'],
                                                        response['userData']['dateDeCreation'],
                                                      );

            this.userInfos.next(userData);
            this.userOwnedGroup.next(userOwnedGroup);
            resolve(response['description']);
          } else {
            this.destroyAuthentication();
            resolve(response['description']);
          }
        },
        (error) => {
          this.destroyAuthentication();
          resolve('Une erreur est survenue.');
        }
      );
    });
  }

  forgotPassword(email: string) {
    return new Promise((resolve) => {

      const userCredentials = {
        email: email
      };
      this.http.post(`${this.config.API_BASE}${this.config.API_ROUTES.DEMANDEMDP}`, userCredentials).subscribe(
        (response) => {
          if (response['description'] === 'Email reconnu') {
            resolve('Veuillez suivre le lien qui a été envoyé a votre adresse email.');
          } else {
            resolve(response['description']);
          }
        },
        (error) => {
          resolve('Une erreur est survenue.');
        }
      );
    });
  }

  createUser(userCredentials: Object) {
    return new Promise((resolve) => {
      this.http.post(`${this.config.API_BASE}${this.config.API_ROUTES.CREATEACCOUNT}`, userCredentials).subscribe(
        (response) => {
          if (response['description'] === 'Utilisateur créé') {
            resolve('Votre compte a été créé.');
          } else {
            resolve(response['description']);
          }
        },
        (error) => {
          resolve('Une erreur est survenue.');
        }
      );
    });
  }

fetchUserInfos(): void {

    /*
    this.http.get(`${this.config.API_BASE}${this.config.API_ROUTES.LOGIN}`).subscribe(
      (response) => {

      },
      (error) => {

      }
    );
    */


    this.userInfos.next(
      new Utilisateur(
        1,
        'email@domain.com',
        'MD5PASSWORD',
        new Contact(
          1,
          'Nom',
          'Prénom',
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
          '0120304050',
          '93 Rue du progrès',
          '69000',
          'LYON',
          'email@domain.com',
          new Profil(
            1,
            'SENIOR',
            '#FFFF00',
          ),
        )
      )
    );
  }

  fetchUserOwnedGroup(): void {
    this.userOwnedGroup.next(
      new Groupe(
        1,
        'Nom du groupe',
        '10/10/2017 - 00:00'
      )
    );
  }

  destroyAuthentication(): void {
    this.isAuthenticated = false;
    this.userInfos = new Subject<Utilisateur>();
    this.userOwnedGroup = new Subject<Groupe>();
    window.localStorage.removeItem('token');
  }

}
