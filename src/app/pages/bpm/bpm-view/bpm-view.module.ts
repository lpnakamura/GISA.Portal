import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { BpmViewComponent } from './bpm-view.component';

@NgModule({
  declarations: [
    BpmViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,    
    NzPageHeaderModule,
    NzSpinModule
  ]
})
export class BpmViewModule { }
