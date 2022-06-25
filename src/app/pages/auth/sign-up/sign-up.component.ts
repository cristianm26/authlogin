import { Component, OnInit } from '@angular/core';
import { ACTIONS } from 'src/app/shared/constants/constants';
import { OptionsForm } from '../../../models/interfaces';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  options: OptionsForm = {
    id: ACTIONS.signUp,
    label: ACTIONS.signUp,
  };
  constructor() {}

  ngOnInit(): void {}
}
