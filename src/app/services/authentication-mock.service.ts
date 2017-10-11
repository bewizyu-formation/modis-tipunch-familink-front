import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/Utilisateur';
import { Contact } from '../models/Contact';
import { Profil } from '../models/Profil';
import { Groupe } from '../models/Groupe';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenticationMockService {

  public isAuthenticated = true;
  public userInfos: Subject<Utilisateur> = new Subject<Utilisateur>();
  public userOwnedGroup: Subject<Groupe> = new Subject<Groupe>();


  constructor() { }

  fetchUserInfos(): void {
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
        ))
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
    this.userInfos = null;
    this.userOwnedGroup = null;
    window.localStorage.removeItem('token');
  }

}
