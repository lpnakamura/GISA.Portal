import { AuthGuardService } from './../../shared/auth-guard/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerComponent } from './container.component';

const routes: Routes = [
  {
    path: '', component: ContainerComponent, canActivate: [AuthGuardService],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'welcome' },
      { path: 'welcome', loadChildren: () => import('../welcome/welcome.module').then(module => module.WelcomeModule) },
      { path: 'bpm', loadChildren: () => import('../bpm/bpm.module').then(module => module.BpmModule) },
      { path: 'repository', loadChildren: () => import('../repository/repository.module').then(module => module.RepositoryModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
