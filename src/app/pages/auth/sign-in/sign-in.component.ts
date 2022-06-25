import { Component, OnInit } from '@angular/core';
import { ACTIONS } from 'src/app/shared/constants/constants';
import { OptionsForm } from '../../../models/interfaces';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  options: OptionsForm = {
    id: ACTIONS.signIn,
    label: ACTIONS.signIn,
  };
  constructor() {}

  ngOnInit(): void {}
}
