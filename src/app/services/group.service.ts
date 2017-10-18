import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient, private config: ConfigService) {}




    createGroup(userCredentials: Object) {
      return new Promise((resolve) => {
        this.http.post( `${this.config.API_BASE}${this.config.API_ROUTES.GROUPES}`, userCredentials).subscribe(
          (response) => {
            resolve(true);
          },
          (error) => {
            resolve(false);
          }
        );
      });
    }

    getGroupesList(idUtilisateur: number, userIdGroupe: number) {
      return new Promise((resolve) => {
        this.http.get( `${this.config.API_BASE}${this.config.API_ROUTES.CONTACTS}${idUtilisateur}` +
          `${this.config.API_ROUTES.CONTACTSGROUPES}`).subscribe(
          (response) => {
            if (response['description'] === 'liste créé') {
              resolve(
                response['groupes'].filter((groupe) => {
                  return groupe['0'] !== userIdGroupe;
                })
              );
            } else {
              resolve([]);
            }
          },
          (error) => {
            resolve([]);
          }
        );
      });
    }
}
