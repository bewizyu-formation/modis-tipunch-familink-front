import { Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { DemandeMdpComponent } from './routes/demande-mdp/demande-mdp.component';
import * as PATHS from './services/navigator.service';



export const ROUTES: Routes = [
  { path: PATHS.PATH_LOGIN, component: LoginComponent },
  { path: PATHS.PATH_FORGOT_PASSWORD, component: DemandeMdpComponent },
];
