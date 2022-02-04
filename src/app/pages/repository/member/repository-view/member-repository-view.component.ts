import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RepositoryResponse } from '../../models/repository-response.interface';
import { RepositoryViewBase } from '../../repository-view-base/repository-view-base';

@Component({
  selector: 'app-member-repository-view',
  templateUrl: '../../repository-view-base/repository-view-base.component.html',
  styleUrls: ['../../repository-view-base/repository-view-base.component.css'],
})
export class MemberRepositoryViewComponent extends RepositoryViewBase<RepositoryResponse> {
  constructor(activatedRoute: ActivatedRoute, router: Router) {
    super(activatedRoute, router, 'member');
  }
}
