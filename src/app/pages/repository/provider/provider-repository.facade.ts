import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RepositoryResponse } from '../models/repository-response.interface';
import { ProviderRepositoryService } from './provider-repository.service';

@Injectable({
  providedIn: 'root',
})
export class ProviderRepositoryFacade {
  constructor(private providerRepositoryService: ProviderRepositoryService) {}

  public getAllAsync(): Observable<RepositoryResponse[]> {
    return this.providerRepositoryService.getAllAsync();
  }

  public getByIdAsync(id: string): Observable<RepositoryResponse> {
    return this.providerRepositoryService.getByIdAsync(id);
  }
}
