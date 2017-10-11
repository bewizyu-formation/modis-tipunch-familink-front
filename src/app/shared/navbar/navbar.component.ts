import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_HOME, PATH_PROFIL, PATH_GROUPES, PATH_LOGIN } from '../../app.routes';

// Services
import { ConfigService } from '../../services/config.service';
import { AuthenticationMockService } from '../../services/authentication-mock.service';

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

  // PATHS
  path_home = PATH_HOME;
  path_profil = PATH_PROFIL;
  path_groupes = PATH_GROUPES;

  // VARS
  userInfos: Utilisateur;
  userOwnedGroup: Groupe;

  constructor(
    public config: ConfigService,
    public router: Router,
    public authService: AuthenticationMockService,
  ) { }

  ngOnInit(): void {
    Sub_userInfos = this.authService.userInfos.subscribe(userInfos => {
      this.userInfos = userInfos;
    });
    Sub_userOwnedGroup = this.authService.userOwnedGroup.subscribe(userOwnedGroup => {
      this.userOwnedGroup = userOwnedGroup;
    });

    // fetch users datas if the user is authenticated
    if (this.authService.isAuthenticated) {
      this.authService.fetchUserInfos();
      this.authService.fetchUserOwnedGroup();
    }

  }

  ngOnDestroy(): void {
    Sub_userInfos.unsubscribe();
    Sub_userOwnedGroup.unsubscribe();
  }

  logout() {
    this.authService.destroyAuthentication();
    this.router.navigate([PATH_LOGIN]);
  }
}
