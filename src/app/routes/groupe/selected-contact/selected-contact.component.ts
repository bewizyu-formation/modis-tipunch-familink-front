import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../../models/Contact';

@Component({
  selector: 'app-selected-contact',
  templateUrl: './selected-contact.component.html',
  styleUrls: ['./selected-contact.component.scss']
})
export class SelectedContactComponent implements OnInit {


  _selectedContact: Contact;

  @Input('selectedContact')
  set selectedContact (value) {
    this._selectedContact = value;

    // call http requests here to get messages !
  }

  get selectedContact () {
    return this._selectedContact;
  }

  constructor() { }

  ngOnInit() {
  }

}
