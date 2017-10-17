import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Contact} from '../../../models/Contact';
import { ConfigService } from '../../../services/config.service';
import { ContactService } from '../../../services/contact.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  isLoading = false;
  filterInputValue: string;

  @Input()
  private idGroupe: number;

  @Output()
  contactSelected: EventEmitter<Contact> = new EventEmitter<Contact>();

  contacts: Array<Contact> = [];

  constructor(public config: ConfigService, private contactService: ContactService) { }

  ngOnInit() {
    this.loadContactList();
  }


  loadContactList() {
    this.isLoading = true;
    console.log(`${this.config.API_BASE}${this.config.API_ROUTES.GROUPES}${this.idGroupe}${this.config.API_ROUTES.GROUPESCONTACT}`);
    this.contactService.getContacts(this.idGroupe).then((contacts) => {
      this.isLoading = false;
      this.contacts = contacts;
    }, (error) => {
      console.log(error);
    });
  }

  selectContact(selectedContact: Contact) {
    this.contactSelected.emit(selectedContact);
  }
}
