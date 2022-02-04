import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RepositoryBaseService } from '../repository-base.service';

@Injectable({
  providedIn: 'root',
})
export class ProviderRepositoryService extends RepositoryBaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'provider');
  }
}
