import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthFacade } from '../login/auth.facade';
import { AuthStore } from './../login/auth.store';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent {
  isCollapsed = false;
  
  public get isAdmin(): boolean {
    return this.authFacade.isAdmin;
  }

  public get isProvider(): boolean {
    return this.authFacade.isProvider;
  }

  public get isMember(): boolean {
    return this.authFacade.isMember;
  }

  public get userName(): string {
    return this.authFacade.userName;
  }

  constructor(protected router: Router, private authFacade: AuthFacade) {}

  async onLogoutAsync(): Promise<void> {
    await this.authFacade.logoutAsync().toPromise();
    this.backToLogin();
  }

  private backToLogin(): void {
    this.router.navigate(['login']);
  }
}
