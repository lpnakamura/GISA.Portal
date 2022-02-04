import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import jwtdecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/shared/local-storage/local-storage.service';

import { AuthService } from './auth.service';
import { AuthStore } from './auth.store';
import { LoginRequest } from './models/login-request.interface';
import { LoginResponse } from './models/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private authStore: AuthStore
  ) {}

  private get credencialsStored(): KeyValue<LoginRequest, LoginResponse> {
    return this.localStorageService.get<KeyValue<LoginRequest, LoginResponse>>(
      'credencials'
    );
  }

  private get credencialsSnapshot(): KeyValue<LoginRequest, LoginResponse> {
    return this.authStore.snapshot || this.credencialsStored;
  }

  public get isAuthenticated(): boolean {
    return Boolean(this.authStore.snapshot);
  }

  public get isAdmin(): boolean {
    return this.userGroups.includes('Admin');
  }

  public get isProvider(): boolean {
    return this.isAdmin || this.userGroups.includes('Provider');
  }

  public get isMember(): boolean {
    return this.isAdmin || this.userGroups.includes('Member');
  }

  public get accessToken(): string {
    return this.credencialsSnapshot?.value.accessToken;
  }

  public get idToken(): string {
    return this.credencialsSnapshot?.value.idToken;
  }

  public get userName(): string {
    return this.credencialsSnapshot?.key.userName;
  }

  public get userGroups(): string[] {
    return jwtdecode(this.credencialsSnapshot.value.accessToken)[
      'cognito:groups'
    ];
  }

  public get hasRefreshTokenStored(): boolean {
    return Boolean(this.credencialsSnapshot.value.refreshToken);
  }

  public get allowAutomaticRefresh(): boolean {
    const credencials =
      this.localStorageService.get<KeyValue<LoginRequest, LoginResponse>>(
        'credencials'
      );
    return credencials && credencials.key.rememberMe;
  }

  public loginAsync(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.authService
      .loginAsync(loginRequest)
      .pipe(tap(() => delete loginRequest.password))
      .pipe(
        tap((LoginResponse) =>
          this.authStore.publisher({ key: loginRequest, value: LoginResponse })
        )
      )
      .pipe(
        tap((loginResponse) =>
          this.localStorageService.save(
            'credencials',
            this.getMergedCredencials(loginResponse)
          )
        )
      );
  }

  public tryLoginWithRefreshTokenAsync(): Observable<LoginResponse> {
    return this.authService
      .tryLoginWithRefreshToken({
        userName: this.credencialsSnapshot.key.userName,
        token: this.credencialsSnapshot.value.refreshToken,
      })
      .pipe(
        tap((loginResponse) =>
          this.authStore.publisher(this.getMergedCredencials(loginResponse))
        )
      )
      .pipe(
        tap((loginResponse) =>
          this.localStorageService.save(
            'credencials',
            this.getMergedCredencials(loginResponse)
          )
        )
      );
  }

  public logoutAsync(): Observable<void> {
    return this.authService
      .logoutAsync(this.userName)
      .pipe(tap(() => this.localStorageService.clearAll()));
  }

  private getMergedCredencials(
    loginResponse: LoginResponse
  ): KeyValue<LoginRequest, LoginResponse> {
    return {
      key: this.credencialsSnapshot.key,
      value: Object.assign(this.credencialsSnapshot.value, {
        idToken: loginResponse.idToken,
        accessToken: loginResponse.accessToken,
      }),
    };
  }
}
