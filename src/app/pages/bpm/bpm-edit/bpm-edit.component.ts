import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';

import { BpmPersistBase } from '../bpm-persist.base';
import { BpmFacade } from '../bpm.facade';
import { BpmOperationModeEnum } from '../models/bpm-operation-mode.enum';
import { BpmResponse } from '../models/bpm-response.interface';

@Component({
  selector: 'app-bpm-edit',
  templateUrl: '../bpm-persist-base.component.html',
  styleUrls: ['../bpm-base.component.css']
})
export class BpmEditComponent extends BpmPersistBase implements OnInit {
  public modalTitle: string = 'Confirme a edição do Diagrama';
  public headerTitle: string = `Edição do Diagrama [${this.bpmRecord.name}]`;

  constructor(private messageService: NzMessageService, protected formBuilder: FormBuilder, protected router: Router,
    protected activatedRoute: ActivatedRoute, protected sanitizer: DomSanitizer, protected bpmFacade: BpmFacade) {
    super(formBuilder, activatedRoute, router, sanitizer, bpmFacade, BpmOperationModeEnum.Edit);
  }

  ngOnInit(): void {
    this.createForm();
    this.buildBpmJSViewer();
    this.getBpmById();
  }

  getBpmRecord(): Observable<BpmResponse> {
    return this.bpmFacade.getByIdAsync(this.bpmIdentifier);
  }

  loadBpmFile(fileUrl: string): Observable<string> {
    return this.bpmFacade.loadFileAsync(fileUrl);
  }

  persistRequest(xmlFile: File): Observable<BpmResponse> {
    return this.bpmFacade.updateAsync(
      {
        id: this.bpmIdentifier, fileIdentifier: this.bpmRecord.fileIdentifier,
        name: this.name, description: this.description, file: xmlFile
      });
  }

  onAfterSuccessfullyPersistRecord(): void {
    this.messageService.success('Diagrama editado com sucesso!');
    setTimeout(() => this.router.navigate(['container', 'bpm', 'list']), 1000);
  }

  onAfterFailPersistRecord(error: HttpErrorResponse): void {
    this.messageService.error(`Falha ao editar o diagrama: ${error?.message}`);
  }
}
