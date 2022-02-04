import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { StoreBase } from './../../shared/models/store-base';
import { LoginRequest } from './models/login-request.interface';
import { LoginResponse } from './models/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthStore implements StoreBase<KeyValue<LoginRequest, LoginResponse>>{
  objectStore$: BehaviorSubject<KeyValue<LoginRequest, LoginResponse>>;
  
  get snapshot(): KeyValue<LoginRequest, LoginResponse> {
    return this.objectStore$.getValue();
  }

  constructor() {
    this.objectStore$ = new BehaviorSubject<KeyValue<LoginRequest, LoginResponse>>(null);
  }

  consumer(): Observable<KeyValue<LoginRequest, LoginResponse>> {
    return this.objectStore$.asObservable();
  }

  publisher(object: KeyValue<LoginRequest, LoginResponse>) {
    this.objectStore$.next(object);
  }
}
