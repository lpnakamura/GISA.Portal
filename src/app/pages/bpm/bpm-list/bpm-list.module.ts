import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import { DeleteOutline, EditOutline, FundViewOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';

import { BpmListComponent } from './bpm-list.component';


const icons: IconDefinition[] = [FundViewOutline, EditOutline, DeleteOutline];

@NgModule({
  declarations: [
    BpmListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzTableModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzIconModule.forRoot(icons)
  ]
})
export class BpmListModule { }
