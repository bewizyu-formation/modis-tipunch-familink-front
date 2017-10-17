import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

import { Contact } from '../models/Contact';
import { Profil } from '../models/Profil';

@Injectable()
export class ContactService {

  constructor(public config: ConfigService, private http: HttpClient) { }

  createContact(idGroupe: number, contactData: Object) {
    return new Promise((resolve) => {
      console.log('idGroupe = ' + idGroupe);
      console.log(contactData);

      /*

      this.http.post(`${this.config.API_BASE}${this.config.API_ROUTES.GROUPES}${idGroupe}` +
        `${this.config.API_ROUTES.GROUPECONTACTS}`, contactData).subscribe(
        (response) => {
          if (response['description'] === 'Contact créé') {
            resolve('Contact créé.');
          } else {
            resolve(response['description']);
          }
        },
        (error) => {
          resolve('Une erreur est survenue.');
        }
      );

      */
    });
  }

}
