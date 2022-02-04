import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BpmAddComponent } from './bpm-add/bpm-add.component';
import { BpmDownloadComponent } from './bpm-download/bpm-download.component';
import { BpmEditComponent } from './bpm-edit/bpm-edit.component';
import { BpmGetByIdResolve } from './bpm-get-by-id.resolver';
import { BpmListComponent } from './bpm-list/bpm-list.component';
import { BpmViewComponent } from './bpm-view/bpm-view.component';

const routes: Routes = [
  { path: 'list', component: BpmListComponent },
  { path: 'edit/:id', component: BpmEditComponent, resolve: { record: BpmGetByIdResolve } },
  { path: 'view/:id', component: BpmViewComponent, resolve: { record: BpmGetByIdResolve } },
  { path: 'download/:id', component: BpmDownloadComponent, resolve: { record: BpmGetByIdResolve } },
  { path: 'add', component: BpmAddComponent },
  { path: '', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BpmRoutingModule { }
