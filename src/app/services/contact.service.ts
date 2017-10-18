import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AuthenticationService } from './authentication.service';

import { Contact } from '../models/Contact';
import {Groupe} from '../models/Groupe';

@Injectable()
export class ContactService {

  constructor(public config: ConfigService, private auth: AuthenticationService, private http: HttpClient) { }

  getContacts(idGroupe: number): Promise<Array<Contact>> {
    return new Promise((resolve) => {

      this.http.get(`${this.config.API_BASE}${this.config.API_ROUTES.GROUPES}` +
        `${idGroupe}`).subscribe(
        (groupe: Groupe) => {
          this.http.get(`${this.config.API_BASE}${this.config.API_ROUTES.GROUPES}` +
            `${idGroupe}${this.config.API_ROUTES.GROUPESCONTACT}`).subscribe(
            (contacts: Array<Contact>) => {
              resolve(
                contacts.filter((contact) => {
                  return contact.idContact !== groupe['utilisateur']['contact']['idContact'];
                })
              );
            },
            (error) => {
              resolve('Une erreur est survenue.');
            }
          );
        },
        (error) => {
          resolve('Une erreur est survenue.');
        }
      );





    });
  }


}
