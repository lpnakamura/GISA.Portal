import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RepositoryResponse } from '../models/repository-response.interface';
import { MemberRepositoryService } from './member-repository.service';

@Injectable({
  providedIn: 'root',
})
export class MemberRepositoryFacade {
  constructor(private memberRepositoryService: MemberRepositoryService) {}

  public getAllAsync(): Observable<RepositoryResponse[]> {
    return this.memberRepositoryService.getAllAsync();
  }

  public getByIdAsync(id: string): Observable<RepositoryResponse> {
    return this.memberRepositoryService.getByIdAsync(id);
  }
}
