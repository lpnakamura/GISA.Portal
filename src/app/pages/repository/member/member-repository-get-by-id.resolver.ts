import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { RepositoryResponse } from '../models/repository-response.interface';
import { MemberRepositoryFacade } from './member-repository.facade';

@Injectable({
  providedIn: 'root'
})
export class MemberRepositoryGetByIdResolve implements Resolve<RepositoryResponse> {
  constructor(private memberRepositoryFacade: MemberRepositoryFacade) { }

  resolve(route: ActivatedRouteSnapshot): Observable<RepositoryResponse> {
    return this.memberRepositoryFacade.getByIdAsync(route.params.id);
  }
}
