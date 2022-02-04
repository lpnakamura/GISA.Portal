import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BpmBase } from '../bpm.base';
import { BpmFacade } from '../bpm.facade';
import { BpmOperationModeEnum } from '../models/bpm-operation-mode.enum';
import { BpmResponse } from '../models/bpm-response.interface';

@Component({
  selector: 'app-bpm-view',
  templateUrl: './bpm-view.component.html',
  styleUrls: ['../bpm-base.component.css']
})
export class BpmViewComponent extends BpmBase implements OnInit {
  constructor(protected activatedRoute: ActivatedRoute, protected router: Router,
    protected sanitizer: DomSanitizer, protected bpmFacade: BpmFacade) {
    super(activatedRoute, router, sanitizer, bpmFacade, BpmOperationModeEnum.View);
  }

  ngOnInit(): void {
    this.buildBpmJSViewer();
    this.getBpmById();
  }

  getBpmRecord(): Observable<BpmResponse> {
    return this.bpmFacade.getByIdAsync(this.bpmIdentifier);
  }

  loadBpmFile(fileUrl: string): Observable<string> {
    return this.bpmFacade.loadFileAsync(fileUrl);
  }
}
