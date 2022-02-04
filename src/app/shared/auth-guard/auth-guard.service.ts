import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthFacade } from 'src/app/pages/login/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authFacade: AuthFacade) {}

  private get isBpmRoute(): boolean {
    return this.router.url.includes('/bpm');
  }

  private get isMemberRoute(): boolean {
    return this.router.url.includes('/member');
  }

  private get isProviderRoute(): boolean {
    return this.router.url.includes('/provider');
  }

  private get isLoginRoute(): boolean {
    return this.router.url.includes('/login');
  }

  private get canAccessBpmRoute(): boolean {
    return this.authFacade.isAdmin;
  }

  private get canAccessMemberRoute(): boolean {
    return this.authFacade.isMember;
  }

  private get canAccessProviderRoute(): boolean {
    return this.authFacade.isProvider;
  }

  private get allowViewBpmRoute(): boolean {
    return this.isBpmRoute && this.canAccessBpmRoute;
  }

  private get allowViewMemberRoute(): boolean {
    return this.isMemberRoute && this.canAccessMemberRoute;
  }

  private get allowViewProviderRoute(): boolean {
    return this.isProviderRoute && this.canAccessProviderRoute;
  }

  canActivate(): boolean {
    if (this.authFacade.isAuthenticated) {
      if (
        this.allowViewBpmRoute ||
        this.allowViewMemberRoute ||
        this.allowViewProviderRoute ||
        this.isLoginRoute
      ) {
        return true;
      }

      // if (this.isLoginRoute && this.canAccessBpmRoute) {
      //   this.router.navigate(['container', 'bpm']);
      //   return true;
      // }

      // if (this.isLoginRoute && this.canAccessMemberRoute) {
      //   this.router.navigate(['container', 'member']);
      //   return true;
      // }

      // if (this.isLoginRoute && this.canAccessProviderRoute) {
      //   this.router.navigate(['container', 'provider']);
      //   return true;
      // }

      this.router.navigate(['login']);
      return false;
    }

    this.router.navigate(['login']);
    return false;
  }
}
