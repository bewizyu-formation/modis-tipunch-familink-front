import {Component, OnInit} from '@angular/core';
import {Contact} from '../../../models/Contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contactList: Array<Contact> = [];

  constructor() { }

  ngOnInit() {
  }

}
