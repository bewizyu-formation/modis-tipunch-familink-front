import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { NavigatorService, PATH_HOME } from '../../services/navigator.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  path_home = PATH_HOME;

  constructor(
    public config: ConfigService,
    public nav: NavigatorService
  ) { }

  ngOnInit() {
  }

}
