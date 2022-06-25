import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials, ApiError, User } from '@supabase/supabase-js';
import { ToastrService } from 'ngx-toastr';
import { OptionsForm } from '../../../models/interfaces';
import { ACTIONS } from '../../../shared/constants/constants';
import { AuthService } from '../services/auth.service';

interface UserResponse extends User, ApiError {}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  authForm!: FormGroup;
  signIN = ACTIONS.signIn;
  @Input() options!: OptionsForm;
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit(): Promise<void> {
    const credentials: UserCredentials = this.authForm.value;
    let actionToCall;
    if (this.options.id === ACTIONS.signIn) {
      actionToCall = this.authService.signIn(credentials);
    } else {
      actionToCall = this.authService.signUp(credentials);
    }
    try {
      const result = (await actionToCall) as UserResponse;
      if (result.email) {
        //redirigir a la vista home
        this.redirectUser();
      } else {
        //mostrar notificación de error
        this.toastr.info(result.message, 'Info');
      }
    } catch (error) {
      console.log(error);
    }
    // this.authService.signIn(this.authForm.value);
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private redirectUser(): void {
    this.router.navigate(['/']);
  }
}
