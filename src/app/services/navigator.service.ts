import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const PATH_HOME = '';
export const PATH_PROFIL = 'profil';
export const PATH_GROUPES = 'groupes';
export const PATH_LOGIN = 'login';
export const PATH_CREATE_ACCOUNT = 'create-account';
export const PATH_FORGOT_PASSWORD = 'forgot-password';
export const PATH_GROUP_SELECTION = 'group-selection';

@Injectable()
export class NavigatorService {

  constructor(public router: Router) { }


}
