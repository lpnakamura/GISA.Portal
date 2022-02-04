import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NgxDiff2htmlModule } from 'ngx-diff2html';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { ProviderRepositoryListComponent } from './repository-list/provider-repository-list.component';
import { ProviderRepositoryViewComponent } from './repository-view/provider-repository-view.component';

const icons: IconDefinition[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzTableModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzDropDownModule,
    NzInputModule,
    NzTagModule,
    NzCollapseModule,
    NgxDiff2htmlModule,
    NgxJsonViewerModule,
    NzIconModule.forRoot(icons)
  ],
  declarations: [ProviderRepositoryViewComponent, ProviderRepositoryListComponent]
})
export class ProviderRepositoryModule {}
