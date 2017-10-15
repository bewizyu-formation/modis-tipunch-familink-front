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
            /*this.fetchUserInfos().then(userInfos => {
              this.userInfos.next(userInfos);
              // TODO: Changer la méthode fetchUserOwnedGroup en promise
              this.fetchUserOwnedGroup();
              setTimeout(() => {
                this.isAuthenticated = true;
                resolve(response['description']);
              }, 500);
            }, error => {
              resolve('Une erreur est survenue');
            });*/

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

  authenticateFormUser(email: string, password: string, confirmpassword: string,
    nom: string, prenom: string, idProfil: number,
    gravatar: string, adresse: string, codePostal: string,
    ville: string, numTel: string
  ) {
    return new Promise((resolve) => {

      const userCredentials = {
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        nom: nom,
        prenom: prenom,
        idProfil: idProfil,
        gravatar: gravatar,
        adresse: adresse,
        codePostal: codePostal,
        ville: ville,
        numTel: numTel
      };
      this.http.post(`${this.config.API_BASE}${this.config.API_ROUTES.CREATEACCOUNT}`, userCredentials).subscribe(
        (response) => {
          if (response['description'] === 'Utilisateur créé') {
            resolve("Votre compte a été créé");
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

  authenticateFormContact(email: string, nom: string, prenom: string, idProfil: number,
    gravatar: string, adresse: string, codePostal: string,
    ville: string, numTel: string
  ) {
    return new Promise((resolve) => {

      const userCredentials = {
        email: email,
        nom: nom,
        prenom: prenom,
        idProfil: idProfil,
        gravatar: gravatar,
        adresse: adresse,
        codePostal: codePostal,
        ville: ville,
        numTel: numTel
      };
      this.http.post(`${this.config.API_BASE}${this.config.API_ROUTES.CREATECONTACT}`, userCredentials).subscribe(
        (response) => {
          if (response['description'] === 'Contact créé') {
            resolve("Votre contact a été créé");
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

  /*fetchUserInfos(): Promise<Utilisateur> {
  
  
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
  }*/

  /*fetchUserInfos(): Promise<Utilisateur> {
    return new Promise(
      (resolve) => {
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
                          console.log(error);
                        }
                      );
                  }
                } 
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
              '93 Rue du progrès',
              '69000',
              'LYON',
              'email@domain.com',
              new Profil(
                1,
                'SENIOR',
                '#FFFF00',
              ),
              '0120304050',
            )
          )
        );
  }*/

  fetchUserOwnedGroup(): void {
    // TODO: remplacer les données mock par les donnnées d'une requete http vers l'api groupes
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
