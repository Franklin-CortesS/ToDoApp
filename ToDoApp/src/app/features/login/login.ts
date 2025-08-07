import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Button } from '../../shared/components/button/button';
import { IRootStateModel } from '../../state/models/states/root.state.model';
import { Store } from '@ngrx/store';
import { loadUserTokenAction } from '../../state/actions/token.actions';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Login {

  inputEmail: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  loginForm: FormGroup = new FormGroup({
    email: this.inputEmail,
  });

  constructor(private spinner: NgxSpinnerService, private store: Store<IRootStateModel>) { }

  ngOnInit(): void {
  }

  login() {
    let credentials = {
      email: this.inputEmail.value
    }

    this.spinner.show();
    this.store.dispatch(loadUserTokenAction({ userCredentials: credentials }));
  }
}
