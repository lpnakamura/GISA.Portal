import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BpmBase } from '../bpm.base';
import { BpmFacade } from '../bpm.facade';
import { BpmOperationModeEnum } from '../models/bpm-operation-mode.enum';
import { BpmResponse } from '../models/bpm-response.interface';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-bpm-download',
  template: '<div #bpmContainer [style.maxHeight.px]="0" class="bpm-container bpm-container-hidden"></div>',
  styleUrls: ['../bpm-base.component.css']
})
export class BpmDownloadComponent extends BpmBase implements OnInit {
  @ViewChild('downloadElement', { static: true }) protected downloadElementRef: ElementRef<HTMLAnchorElement>;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router,
    protected sanitizer: DomSanitizer, protected bpmFacade: BpmFacade) {
    super(activatedRoute, router, sanitizer, bpmFacade, BpmOperationModeEnum.Download);
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

  afterReceiveSvgContent(svgContent: string): void {
    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    saveAs(blob, `${this.bpmIdentifier}.svg`);
    this.router.navigate(['container', 'bpm', 'list']);
  }
}
