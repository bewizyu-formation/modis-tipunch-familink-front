import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Contact} from '../../models/Contact';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.scss']
})
export class GroupeComponent implements OnInit {

  idGroupe: number;
  selectedContact: Contact;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.idGroupe = parseInt(this.route.snapshot.paramMap.get('idGroupe'), 10);
  }

  handleSelectedContact(selectedContact) {
    this.selectedContact = selectedContact;
  }

}
