import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MemberRepositoryGetByIdResolve } from './member/member-repository-get-by-id.resolver';
import { MemberRepositoryListComponent } from './member/repository-list/member-repository-list.component';
import { MemberRepositoryViewComponent } from './member/repository-view/member-repository-view.component';
import { ProviderRepositoryGetByIdResolve } from './provider/provider-repository-get-by-id.resolver';
import { ProviderRepositoryListComponent } from './provider/repository-list/provider-repository-list.component';
import { ProviderRepositoryViewComponent } from './provider/repository-view/provider-repository-view.component';

const routes: Routes = [
  {
    path: 'member',
    children: [
      { path: 'list', component: MemberRepositoryListComponent },
      {
        path: 'view/:id',
        component: MemberRepositoryViewComponent,
        resolve: { record: MemberRepositoryGetByIdResolve },
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
  {
    path: 'provider',
    children: [
      { path: 'list', component: ProviderRepositoryListComponent },
      {
        path: 'view/:id',
        component: ProviderRepositoryViewComponent,
        resolve: { record: ProviderRepositoryGetByIdResolve },
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'member', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepositoryRoutingModule {}
