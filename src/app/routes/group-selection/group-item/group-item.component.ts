import { Component, OnInit } from '@angular/core';
import {Groupe} from '../../../models/Groupe';
import {NavigatorService, PATH_GROUP_SELECTION} from '../../../services/navigator.service';
import {ConfigService} from '../../../services/config.service';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent implements OnInit {

constructor(public nav: NavigatorService, public config: ConfigService) { }

  group: Groupe;
  groupOwner: Groupe;


  groupRedirect(){}

  ngOnInit() {
    // this.nav.router.navigate([PATH_GROUP_SELECTION]);
  }

}
