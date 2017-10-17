import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient, private config: ConfigService) {}




    createGroup(userCredentials: Object) {
    return new Promise((resolve) => {
      this.http.post( `${this.config.API_BASE}${this.config.API_ROUTES.GROUPSELECTION}`, userCredentials).subscribe(
        (response) => {
          if (response['description'] === 'groupe créé') {
            resolve('Votre groupe a bien été créé.');
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
  /*public ge
  return this.http.get(`${this.config.API_BASE}${this.config.API_ROUTES.PROFILS}`);*/

}
