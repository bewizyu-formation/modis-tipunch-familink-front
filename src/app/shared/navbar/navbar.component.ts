import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

// Services
import { ConfigService } from '../../services/config.service';
import { AuthenticationService } from '../../services/authentication.service';
import {  NavigatorService, PATH_HOME, PATH_LOGIN, PATH_PROFIL, PATH_GROUP_SELECTION} from '../../services/navigator.service';

// Models
import { Utilisateur } from '../../models/Utilisateur';
import { Groupe } from '../../models/Groupe';

let Sub_userInfos;
let Sub_userOwnedGroup;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {

  // VARS
  userInfos: Utilisateur;
  userOwnedGroup: Groupe;

  path_home = PATH_HOME;
  path_profil = PATH_PROFIL;
  path_groupes = PATH_GROUP_SELECTION;


  constructor(
    public config: ConfigService,
    public nav: NavigatorService,
    public authService: AuthenticationService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    Sub_userInfos = this.authService.userInfos.subscribe(userInfos => {
      this.userInfos = userInfos;
    });
    Sub_userOwnedGroup = this.authService.userOwnedGroup.subscribe(userOwnedGroup => {
      this.userOwnedGroup = userOwnedGroup;
    });

    // fetch users datas if the user is authenticated
    if (window.localStorage.getItem('token')) {
      this.authService.autoAuthFromToken().then((success) => {
        if (!success) {
          console.log('need to relog');
          this.snackBar.open('VOTRE CONNEXION N\'EST PLUS VALIDE.', 'SE RECONNECTER')
            .onAction().subscribe(() => {
            this.logout();
          });
        }
      });
    }


  }

  ngOnDestroy(): void {
    Sub_userInfos.unsubscribe();
    Sub_userOwnedGroup.unsubscribe();
  }

  logout() {
    this.authService.destroyAuthentication();
    this.nav.router.navigate([PATH_LOGIN]);
  }

}
