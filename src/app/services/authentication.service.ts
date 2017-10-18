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
            this.fetchUserDataFromToken().then((success) => {
              if (success === true) {
                setTimeout(() => {
                  this.isAuthenticated = true;
                  resolve(response['description']);
                }, 500);
              } else {
                resolve('Une erreur est survenue');
              }
            });
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

  autoAuthFromToken() {
    return new Promise((resolve) => {
      this.fetchUserDataFromToken().then((success) => {
        this.isAuthenticated = true;
        resolve(success);
      });
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
      this.http.post(`${this.config.API_BASE}${this.config.API_ROUTES.UTILISATEURS}`, userCredentials).subscribe(
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

  fetchUserDataFromToken() {
    return new Promise((resolve) => {
      this.fetchUserInfos().then(userInfos => {
        this.userInfos.next(userInfos);
        this.fetchUserOwnedGroup().then(userOwnedGroup => {
          this.userOwnedGroup.next(userOwnedGroup);
          resolve(true);
        }, error => {
          resolve(false);
        });
      }, error => {
        resolve(false);
      });
    });
  }

  getUserIdFromToken(token: string): number {
    const decodedToken = atob(token);
    const separatorIndex = decodedToken.indexOf('-');
    if (!separatorIndex) { throw new Error('Token separator not found'); }
    try {
      return parseInt(decodedToken.slice(0, separatorIndex), 10);
    } catch (e) {
      throw new Error('Cannot parse user id from token');
    }
  }

  fetchUserInfos(): Promise<Utilisateur> {
    return new Promise((resolve) => {
      if (window.localStorage.getItem('token')) {
        const userId = this.getUserIdFromToken(window.localStorage.getItem('token'));
        this.http.get(`${this.config.API_BASE}${this.config.API_ROUTES.UTILISATEURS}${userId}`).subscribe(
          (response) => {
            resolve(
              new Utilisateur(
                response['idUtilisateur'],
                response['email'],
                response['motDePasse'],
                new Contact(
                  response['contact']['idContact'],
                  response['contact']['nom'],
                  response['contact']['prenom'],
                  response['contact']['gravatar'],
                  response['contact']['numTel'],
                  response['contact']['adresse'],
                  response['contact']['codePostal'],
                  response['contact']['ville'],
                  response['contact']['email'],
                  new Profil(
                    response['contact']['profil']['idProfil'],
                    response['contact']['profil']['nom'],
                    response['contact']['profil']['couleur'],
                  ))
              )
            );
          },
          (error) => {
            this.destroyAuthentication();
          }
        );

      }

    });
  }

  fetchUserOwnedGroup(): Promise<Groupe> {
    return new Promise((resolve) => {
      if (window.localStorage.getItem('token')) {
        const userId = this.getUserIdFromToken(window.localStorage.getItem('token'));


        this.http.get(`${this.config.API_BASE}${this.config.API_ROUTES.UTILISATEURS}${userId}`
          + `${this.config.API_ROUTES.UTILISATEURSGROUPE}`).subscribe(
          (response) => {
            if (response['userOwnedGroup'] !== '') {
              resolve(
                new Groupe(
                  response['userOwnedGroup']['idGroupe'],
                  response['userOwnedGroup']['nom'],
                  response['userOwnedGroup']['dateDeCreation'],
                )
              );
            } else {
              resolve(
                new Groupe(
                  0,
                  'Aucun groupe',
                  '',
                )
              );
            }
          },
          (error) => {
            this.destroyAuthentication();
          }
        );

      }
    });
  }

  destroyAuthentication(): void {
    this.isAuthenticated = false;
    window.localStorage.removeItem('token');
  }

}
