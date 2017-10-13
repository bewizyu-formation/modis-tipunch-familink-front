import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()
export class ProfilService {
  
  constructor(public config: ConfigService, private http: HttpClient) { }

  public getProfils() {
    return this.http.get(`${this.config.API_BASE}${this.config.API_ROUTES.PROFILS}`)
  }

  

}
