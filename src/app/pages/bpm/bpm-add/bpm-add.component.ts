import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of } from 'rxjs';

import { BpmPersistBase } from '../bpm-persist.base';
import { BpmFacade } from '../bpm.facade';
import { BpmOperationModeEnum } from '../models/bpm-operation-mode.enum';
import { BpmResponse } from '../models/bpm-response.interface';

@Component({
  selector: 'app-bpm-add',
  templateUrl: '../bpm-persist-base.component.html',
  styleUrls: ['../bpm-base.component.css']
})
export class BpmAddComponent extends BpmPersistBase implements OnInit {
  public modalTitle: string = 'Confirme a inclusão do Diagrama';
  public headerTitle: string = 'Inclusão do Diagrama';

  constructor(private messageService: NzMessageService, protected formBuilder: FormBuilder, protected router: Router,
    protected activatedRoute: ActivatedRoute, protected sanitizer: DomSanitizer, protected bpmFacade: BpmFacade) {
    super(formBuilder, activatedRoute, router, sanitizer, bpmFacade, BpmOperationModeEnum.New);
  }

  ngOnInit(): void {
    this.createForm();
    this.buildBpmJSViewer();
    this.getBpmById();
  }

  getBpmRecord(): Observable<BpmResponse> {
    return of(<any>{});
  }

  loadBpmFile(): Observable<string> {
    return this.bpmFacade.loadNewFileAsync();
  }

  persistRequest(xmlFile: File): Observable<BpmResponse> {
    return this.bpmFacade.saveAsync({ name: this.name, description: this.description, file: xmlFile });
  }

  onAfterSuccessfullyPersistRecord(): void {
    this.messageService.success('Diagrama criado com sucesso!');
    setTimeout(() => this.router.navigate(['container', 'bpm', 'list']), 1000);
  }
  onAfterFailPersistRecord(error: HttpErrorResponse): void {
    this.messageService.error(`Falha ao criar o diagrama: ${error?.message}`);
  }
}
