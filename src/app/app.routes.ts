import { Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import * as PATHS from './services/navigator.service';



export const ROUTES: Routes = [
  { path: PATHS.PATH_LOGIN, component: LoginComponent },
];
