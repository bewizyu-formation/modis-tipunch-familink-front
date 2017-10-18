import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  public appName = 'Familink';

  public GRAVATAR_BASE = 'https://www.gravatar.com/avatar/';
  public API_BASE = 'http://localhost:8080/familink/mvc/';
  public API_ROUTES = {
    LOGIN: 'login',
    DEMANDEMDP: 'forgot-password',
    UTILISATEURS: 'utilisateurs/',
    UTILISATEURSGROUPE: '/groupe',
    PROFILS: 'profils/',
    GROUPES: 'groupes/',
    GROUPESCONTACT: '/contacts',
    UPDATEPASSWORD: 'update-password/',
    GROUPSELECTION: 'group-selection',
    CONTACTS: 'contacts/',
    CONTACTSGROUPES: '/groupes',
  };

  constructor() { }

}
