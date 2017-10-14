import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  public appName = 'Familink';


  // public API_BASE = 'http://172.20.10.2:8080/atelier/mvc/';
  public API_BASE = 'http://localhost:8080/familink/mvc/';
  public API_ROUTES = {
    LOGIN: 'login',
    DEMANDEMDP: 'forgot-password',
    UTILISATEUR: 'utilisateurs/',
  };

  constructor() { }

}
