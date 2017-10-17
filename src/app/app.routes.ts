import { Routes } from '@angular/router';
import * as PATHS from './services/navigator.service';
import { LoginComponent } from './routes/login/login.component';
import { DemandeMdpComponent } from './routes/demande-mdp/demande-mdp.component';
import { CreateUserComponent } from './routes/create-user/create-user.component';
import { HomeComponent } from './routes/home/home.component';
import { GroupeComponent } from './routes/groupe/groupe.component';
import { UpdateMdpComponent } from './routes/update-mdp/update-mdp.component';

export const ROUTES: Routes = [
  { path: PATHS.PATH_LOGIN, component: LoginComponent },
  { path: PATHS.PATH_FORGOT_PASSWORD, component: DemandeMdpComponent },
  { path: PATHS.PATH_CREATE_ACCOUNT, component: CreateUserComponent },
  { path: PATHS.PATH_HOME, component: HomeComponent},
  { path: PATHS.PATH_SELECTED_GROUP, component: GroupeComponent},
  { path: PATHS.PATH_UPDATE_PASSWORD, component: UpdateMdpComponent },
];
