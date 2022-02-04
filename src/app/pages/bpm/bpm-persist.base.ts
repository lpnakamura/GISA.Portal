import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';

import { BpmBase } from './bpm.base';
import { BpmFacade } from './bpm.facade';
import { BpmOperationModeEnum } from './models/bpm-operation-mode.enum';
import { BpmResponse } from './models/bpm-response.interface';

@Component({
    template: ''
})
export abstract class BpmPersistBase extends BpmBase {
    public showConfirmModal = false;
    public submitInProgress = false;
    public bpmFormGroup: FormGroup;
    public abstract modalTitle: string;
    public abstract headerTitle: string;

    protected get name(): string {
        return this.bpmFormGroup.controls.name.value;
    }

    protected get description(): string {
        return this.bpmFormGroup.controls.description.value;
    }

    constructor(protected formBuilder: FormBuilder, protected activatedRoute: ActivatedRoute, protected router: Router,
        protected sanitizer: DomSanitizer, protected bpmFacade: BpmFacade, protected operation: BpmOperationModeEnum) {
        super(activatedRoute, router, sanitizer, bpmFacade, operation);
    }

    abstract persistRequest(xmlFile: File): Observable<BpmResponse>;
    abstract onAfterSuccessfullyPersistRecord?(): void;
    abstract onAfterFailPersistRecord?(error: HttpErrorResponse): void;

    public onSubmit(): void {
        this.bpmJS.saveXML({ format: true }, (_, xmlContent) => {
            this.submitInProgress = true;
            const xmlFile = this.generateFileFromXmlContent(xmlContent);
            this.persistRequest(xmlFile)
                .pipe(take(1))
                .pipe(tap(() => this.showConfirmModal = false))
                .pipe(finalize(() => this.submitInProgress = false))
                .subscribe(() => this.onAfterSuccessfullyPersistRecord(),
                    (error: HttpErrorResponse) => this.onAfterFailPersistRecord(error));
        });
    }

    public onConfirm(): void {
        this.showConfirmModal = true;
    }

    public onDismiss(): void {
        this.showConfirmModal = false;
    }

    protected createForm(): void {
        this.bpmFormGroup = this.formBuilder.group({
            name: [this.bpmRecord?.name, Validators.required],
            description: [this.bpmRecord?.description, Validators.required]
        })
    }
}