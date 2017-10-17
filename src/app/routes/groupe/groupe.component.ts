import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.scss']
})
export class GroupeComponent implements OnInit {

  idGroupe: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('idGroupe'));
  }

}
