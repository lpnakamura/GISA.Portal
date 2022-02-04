import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MemberRepositoryModule } from './member/member-repository.module';
import { ProviderRepositoryModule } from './provider/provider-repository.module';
import { RepositoryRoutingModule } from './repository-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MemberRepositoryModule,
    ProviderRepositoryModule,
    RepositoryRoutingModule
  ]
})
export class RepositoryModule { }
