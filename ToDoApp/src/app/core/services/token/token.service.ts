import { Injectable } from '@angular/core';
import { ApiPathsService } from '../api-paths/api-paths.service.';
import { ApiService } from '../api/api.service';
import { ICredentials } from '../../../state/models/interfaces/tokens.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  constructor(
    private apiPathsService: ApiPathsService,
    private apiService: ApiService
  ) { }

  loadUserToken(credentials: ICredentials) {
    let url = this.apiPathsService.getApiPath('login');
    return this.apiService.commonPostRequest(url, credentials);
  }
}
