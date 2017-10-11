import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_HOME, PATH_PROFIL, PATH_GROUPES, PATH_LOGIN } from '../../app.routes';

// Services
import { ConfigService } from '../../services/config.service';
import { AuthenticationMockService } from '../../services/authentication-mock.service';

let Sub_getUserInfos;
let Sub_getGroup;

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


  constructor(
    public config: ConfigService,
    public router: Router,
    public authService: AuthenticationMockService,
  ) { }

  ngOnInit(): void {
    Sub_getUserInfos = this.authService.getUserInfos().subscribe(userInfos => {
      this.authService.userInfos = userInfos;
    });
    Sub_getGroup = this.authService.getGroup().subscribe(userGroup => {
      this.authService.userGroup = userGroup;
    });
  }

  ngOnDestroy(): void {
    Sub_getUserInfos.unsubscribe();
    Sub_getGroup.unsubscribe();
  }

  logout() {
    this.authService.destroyAuthentication();
    this.router.navigate([PATH_LOGIN]);
  }
}
