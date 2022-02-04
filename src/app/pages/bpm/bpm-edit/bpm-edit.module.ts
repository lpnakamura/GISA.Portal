import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import { SaveOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { BpmEditComponent } from './bpm-edit.component';

const icons: IconDefinition[] = [SaveOutline];

@NgModule({
  declarations: [
    BpmEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzModalModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzMessageModule,
    NzSpinModule,
    NzIconModule.forRoot(icons)
  ]
})
export class BpmEditModule { }
