import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PASSWORD_VALIDATOR} from'../../validators/password.validator';

@Component({
  selector: 'app-update-mdp',
  templateUrl: './update-mdp.component.html',
  styleUrls: ['./update-mdp.component.scss']
})
export class UpdateMdpComponent implements OnInit {

  constructor() { }

  password = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_VALIDATOR)]);
  newPassword = new FormControl('', [Validators.required]);
  hide = true;

  ngOnInit() {
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Saisissez password' : '';
  }

  getPasswordConfirmationErrorMessage() {
    return this.newPassword.hasError('required') ? 'Confirmez password' : '';
  }

  updatePwd() {}

}
