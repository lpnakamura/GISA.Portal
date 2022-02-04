import { AfterContentInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import { from, Observable, Subject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { BpmFacade } from './bpm.facade';
import { BpmOperationModeEnum } from './models/bpm-operation-mode.enum';
import { BpmResponse } from './models/bpm-response.interface';

@Component({
    template: ''
})
export abstract class BpmBase implements AfterContentInit, OnDestroy {
    public svgSafeHtmlContent: SafeHtml;
    public bpmFileLoaded: boolean;
    protected bpmJS: BpmnJS;
    private afterImportDiagram = new Subject();
    private afterGenerateSvg = new Subject<string>();

    @ViewChild('bpmContainer', { static: true }) protected bpmContainerElementRef: ElementRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router,
        protected sanitizer: DomSanitizer, protected bpmFacade: BpmFacade, protected operation: BpmOperationModeEnum) {
        this.prepareTriggersByOperation(operation);
    }

    abstract getBpmRecord(): Observable<BpmResponse>;
    abstract loadBpmFile(fileUrl: string): Observable<string>;

    ngAfterContentInit(): void {
        this.attachBpmContainer();
    }

    ngOnDestroy(): void {
        this.destroyBpmJSViewer();
    }

    public onBack(): void {
        this.router.navigate(['container', 'bpm', 'list']);
    }

    public get bpmRecord(): BpmResponse {
        return this.activatedRoute.snapshot?.data.record;
    }

    protected get bpmIdentifier(): string {
        return this.activatedRoute.snapshot.params.id;
    }

    protected getBpmById(): void {
        this.getBpmRecord()
            .pipe(take(1))
            .subscribe(bpm => this.loadFileUrl(bpm.fileUrl));
    }

    protected buildBpmJSViewer(): void {
        this.bpmJS = new BpmnJS();
        this.bpmJS.on('import.done', ({ error }) => {
            if (!error) { this.bpmJS.get('canvas').zoom('fit-viewport') }
        });
    }

    protected generateFileFromXmlContent(xmlContent: string): File {
        const blobFromXmlContent = new Blob([xmlContent], { type: "text/xml;charset=utf-8" });
        return new File([blobFromXmlContent], 'diagram.bpmn', { type: blobFromXmlContent.type });
    }

    protected afterReceiveSvgContent(svgContent: string): void {
        this.bpmJS.detach();
        this.bpmContainerElementRef.nativeElement.remove();
        this.svgSafeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(svgContent);
    }

    private loadFileUrl(fileUrl: string): void {
        this.loadBpmFile(fileUrl)
            .pipe(switchMap((xml: string) => this.importDiagram(xml)))
            .pipe(tap(() => this.afterImportDiagram.next()))
            .pipe(tap(() => this.bpmFileLoaded = true))
            .toPromise();
    }

    private importDiagram(xml: string): Observable<{ warnings: Array<any> }> {
        return from(this.bpmJS.importXML(xml) as Promise<{ warnings: Array<any> }>);
    }

    private prepareSvg(): void {
        this.bpmJS.saveSVG({ format: true }, (_, xml) => this.afterGenerateSvg.next(xml));
    }

    private destroyBpmJSViewer(): void {
        this.bpmJS.destroy();
    }

    private attachBpmContainer(): void {
        this.bpmJS.attachTo(this.bpmContainerElementRef.nativeElement);
    }

    private listenAfterImportDiagramChanges(): void {
        this.afterImportDiagram.pipe(take(1))
            .subscribe(() => this.prepareSvg());
    }

    private listenAfterGenerateSvgChanges(): void {
        this.afterGenerateSvg.pipe(take(1))
            .subscribe(svgContent => this.afterReceiveSvgContent(svgContent));
    }

    private prepareTriggersByOperation(operation: BpmOperationModeEnum): void {
        if ([BpmOperationModeEnum.View, BpmOperationModeEnum.Download]
            .includes(operation)) { this.listenAfterGenerateSvgChanges(); }
        this.listenAfterImportDiagramChanges();
    }
}