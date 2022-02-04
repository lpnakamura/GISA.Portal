import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key));
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clearAll(): void {
    localStorage.clear();
  }
}
