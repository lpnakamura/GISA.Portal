import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { RepositoryResponse } from '../models/repository-response.interface';
import { ProviderRepositoryFacade } from './provider-repository.facade';

@Injectable({
  providedIn: 'root'
})
export class ProviderRepositoryGetByIdResolve implements Resolve<RepositoryResponse> {
  constructor(private providerRepositoryFacade: ProviderRepositoryFacade) { }

  resolve(route: ActivatedRouteSnapshot): Observable<RepositoryResponse> {
    return this.providerRepositoryFacade.getByIdAsync(route.params.id);
  }
}
