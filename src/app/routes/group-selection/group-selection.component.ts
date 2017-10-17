import {Component, OnDestroy, OnInit} from '@angular/core';
import {Groupe} from '../../models/Groupe';
import {FormControl, Validators} from '@angular/forms';
import {ConfigService} from '../../services/config.service';
import {GroupService} from '../../services/group.service';
import {AuthenticationService} from '../../services/authentication.service';
import {PATH_GROUPES, NavigatorService, PATH_GROUP_SELECTION} from '../../services/navigator.service';
import {Utilisateur} from '../../models/Utilisateur';
import { MatSnackBar } from '@angular/material';

let Sub_userInfos;
let Sub_userOwnedGroup;

@Component({
  selector: 'app-group-selection',
  templateUrl: './group-selection.component.html',
  styleUrls: ['./group-selection.component.scss']
})
export class GroupSelectionComponent implements OnInit, OnDestroy {

  userInfos: Utilisateur;
  userOwnedGroup: Groupe;

  isProcessing = false;
  isUserDataFetched = false;
  formCreateGroupMessage = '';
  nom = new FormControl('', [Validators.required]);
  Groups: Array<Groupe> = [];


  constructor(public config: ConfigService,
              public authService: AuthenticationService,
              public nav: NavigatorService,
              public groupeService: GroupService,
              public snackBar: MatSnackBar,
              ) {}


  createGroup(): void {
    this.isProcessing = true;
    if (this.nom.valid) {

      const createFormData = {
        nom: this.nom.value,
      };
      this.groupeService.createGroup(createFormData).then(
        (createAttempt: string) => {
          this.formCreateGroupMessage = createAttempt;
          this.isProcessing = false;
          if (this.formCreateGroupMessage === 'Votre groupe a bien été crée.') {
            setTimeout(() => {
              this.nav.router.navigate([PATH_GROUPES]);
            }, 1000);
          }
        }, (error: string) => {
          this.formCreateGroupMessage = error;
          this.isProcessing = false;
        });
    }
  }

  getGroupeEmptyErrorMessage() {
    return this.nom.hasError('required') ? 'Vous devez saisir un nom de groupe' : '';

  }

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
            this.authService.destroyAuthentication();
          });
        } else {
          this.isUserDataFetched = true;
        }
      });
    }

  }

  openGroup(idGroupe: number) {
    this.nav.router.navigate([`${PATH_GROUP_SELECTION}/${idGroupe}`]);
  }

  ngOnDestroy(): void {
    Sub_userInfos.unsubscribe();
    Sub_userOwnedGroup.unsubscribe();
  }
}
