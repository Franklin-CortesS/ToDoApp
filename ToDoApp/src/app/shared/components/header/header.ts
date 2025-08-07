import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Button } from '../button/button';
import { NgxSpinnerService } from 'ngx-spinner';
import { IRootStateModel } from '../../../state/models/states/root.state.model';
import { Store } from '@ngrx/store';
import { revokeUserTokenAction } from '../../../state/actions/token.actions';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Header {

  constructor(private spinner: NgxSpinnerService, private store: Store<IRootStateModel>) {

  }

  logout() {
    this.spinner.show();
    this.store.dispatch(revokeUserTokenAction());
  }
}
