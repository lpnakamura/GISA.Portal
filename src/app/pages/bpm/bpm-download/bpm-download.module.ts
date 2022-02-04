import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { BpmDownloadComponent } from './bpm-download.component';

@NgModule({
  declarations: [
    BpmDownloadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzSpinModule
  ]
})
export class BpmDownloadModule { }
