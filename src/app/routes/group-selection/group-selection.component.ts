import {Component, OnInit} from '@angular/core';
import {Groupe} from '../../models/Groupe';
import {FormControl, Validators} from '@angular/forms';
import {ConfigService} from '../../services/config.service';
import {GroupService} from '../../services/group.service';
import {AuthenticationService} from '../../services/authentication.service';
import {PATH_GROUPES, NavigatorService} from '../../services/navigator.service';

@Component({
  selector: 'app-group-selection',
  templateUrl: './group-selection.component.html',
  styleUrls: ['./group-selection.component.scss']
})
export class GroupSelectionComponent implements OnInit {
  isProcessing = false;
  formCreateGroupMessage = '';
  nom = new FormControl('', [Validators.required]);
  Groups: Array<Groupe> = [];



  ownerHasNoGroup: boolean=false;

  constructor(public config: ConfigService,
              public authService: AuthenticationService,
              public nav: NavigatorService,
              public groupeService: GroupService) {
  }


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
  ngOnInit() {
  }
}
