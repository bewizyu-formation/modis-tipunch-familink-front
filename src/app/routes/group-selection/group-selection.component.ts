import { Component, OnInit } from '@angular/core';
import {Groupe} from '../../models/Groupe';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-group-selection',
  templateUrl: './group-selection.component.html',
  styleUrls: ['./group-selection.component.scss']
})
export class GroupSelectionComponent implements OnInit {

  isProcessing = false;
  nomGroup = new FormControl('', [Validators.required]);
  Groups: Array<Groupe> = [];


  Groups2 = ['Papy Mougeot', 'Mère Theresa'];


  constructor() {
  }

  ngOnInit() {


  }

  createGroup(): void {
    this.isProcessing = true;
    if (this.isFormValid()) {

      /* const createFormData= {
       nom: this.nomGroup.get('nom').value,
         dateDeCreation: this.dateDeCreation.value,


     }*/
    }
  }


  getGroupeEmptyErrorMessage() {
    return this.nomGroup.get('nom').hasError('required') ? 'Vous devez saisir un nom' : '';

  }

  isFormValid(): boolean {
    if (this.nomGroup.value.length > 0) {
      return (this.nomGroup.valid);
    }
  }
}
