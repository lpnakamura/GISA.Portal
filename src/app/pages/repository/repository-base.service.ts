import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class RepositoryBaseService {
  constructor(protected httpClient: HttpClient, protected resource: string) {}
  
  public getByIdAsync<T>(id: string): Observable<T> {
    return this.httpClient.get<T>(
      `${environment.CDC_BASE_URL}${this.resource}/api/v1/${this.resource}/${id}`
    );
  }

  public getAllAsync<T>(): Observable<T[]> {
    return this.httpClient.get<T[]>(
      `${environment.CDC_BASE_URL}${this.resource}/api/v1/${this.resource}`
    );
  }
}
