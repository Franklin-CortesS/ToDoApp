import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiPathsService {
  constructor() { }

  getApiPath(pathKey: keyof typeof environment.API_PATHS, params?: Record<string, string | number>): string {
    let path = environment.API_PATHS[pathKey];

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        path = path.replace(`{${key}}`, String(value));
      });
    }

    return environment.API_URL + path;
  }
}
