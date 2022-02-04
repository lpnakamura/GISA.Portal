import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LoginRequest } from './models/login-request.interface';
import { LoginResponse } from './models/login-response.interface';
import { RefreshRequest } from './models/refresh-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  public loginAsync(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.AUTH_BASE_URL}api/v1/authentication/login`, loginRequest);
  }

  public tryLoginWithRefreshToken(refreshRequest: RefreshRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.AUTH_BASE_URL}api/v1/authentication/refresh`, refreshRequest);
  }

  public logoutAsync(userName: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.AUTH_BASE_URL}api/v1/authentication/signout`, { userName });
  }
}
