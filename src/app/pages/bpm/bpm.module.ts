import { BpmDownloadModule } from './bpm-download/bpm-download.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BpmAddModule } from './bpm-add/bpm-add.module';
import { BpmEditModule } from './bpm-edit/bpm-edit.module';
import { BpmListModule } from './bpm-list/bpm-list.module';
import { BpmRoutingModule } from './bpm-routing.module';
import { BpmViewModule } from './bpm-view/bpm-view.module';

@NgModule({
  imports: [
    CommonModule,
    BpmListModule,
    BpmAddModule,
    BpmEditModule,
    BpmViewModule,
    BpmDownloadModule,
    BpmRoutingModule
  ]
})
export class BpmModule { }
