import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Utilisateur } from '../models/Utilisateur';
import { Contact } from '../models/Contact';
import { Profil } from '../models/Profil';
import { Groupe } from '../models/Groupe';

@Injectable()
export class AuthenticationMockService {

  public isAuthenticated = true;
  public userInfos: Utilisateur;
  public userGroup: Groupe;

  constructor() { }

  getUserInfos(): Observable<Utilisateur> {
    return new Observable(observer => {

      const userSample: Utilisateur = new Utilisateur(
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
          ))
      );

      observer.next(userSample);
      observer.complete();
    });
  }

  getGroup(): Observable<Groupe> {
    return new Observable(observer => {

      const groupeSample: Groupe = new Groupe(
        1,
        'Nom du groupe',
        '10/10/2017 - 00:00'
      );

      observer.next(groupeSample);
      observer.complete();
    });
  }

  destroyAuthentication(): void {
    this.isAuthenticated = false;
    this.userInfos = null;
    this.userGroup = null;
    window.localStorage.removeItem('token');
  }

}
