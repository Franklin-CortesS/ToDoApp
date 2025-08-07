import { Injectable } from '@angular/core';
import { ApiPathsService } from '../api-paths/api-paths.service.';
import { ApiService } from '../api/api.service';
import { ICredentials } from '../../../state/models/interfaces/tokens.interface';
import { firstValueFrom } from 'rxjs';
import { IRootStateModel } from '../../../state/models/states/root.state.model';
import { Store } from '@ngrx/store';
import { selectTokenLoadSuccess } from '../../../state/selectors/tokens.selectors';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private apiPathsService: ApiPathsService,
    private apiService: ApiService,
    private store: Store<IRootStateModel>
  ) { }

  loadUserToken(credentials: ICredentials) {
    let url = this.apiPathsService.getApiPath('login');
    return this.apiService.commonPostRequest(url, credentials);
  }

  revokeUserToken() {
    let url = this.apiPathsService.getApiPath("logout")
    return this.apiService.commonPostRequest(url);
  }

  async userHasToken() {
    return await firstValueFrom(this.store.select(selectTokenLoadSuccess));
  }
}
