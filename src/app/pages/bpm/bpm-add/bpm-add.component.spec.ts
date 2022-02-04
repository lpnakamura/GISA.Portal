import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BpmFacade } from '../bpm.facade';
import { BpmAddComponent } from './bpm-add.component';

describe('BpmAddComponent', () => {
  let component: BpmAddComponent;
  let fixture: ComponentFixture<BpmAddComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({});
    const domSanitizerStub = () => ({});
    const activatedRouteStub = () => ({});
    const routerStub = () => ({ navigate: array => ({}) });
    const nzMessageServiceStub = () => ({
      success: string => ({}),
      error: arg => ({})
    });
    const bpmFacadeStub = () => ({
      loadNewFileAsync: () => ({}),
      saveAsync: object => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BpmAddComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: NzMessageService, useFactory: nzMessageServiceStub },
        { provide: BpmFacade, useFactory: bpmFacadeStub }
      ]
    });
    fixture = TestBed.createComponent(BpmAddComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`modalTitle has default value`, () => {
    expect(component.modalTitle).toEqual(`Confirme a inclusão do Diagrama`);
  });

  it(`headerTitle has default value`, () => {
    expect(component.headerTitle).toEqual(`Inclusão do Diagrama`);
  });

  describe('onAfterFailPersistRecord', () => {
    it('makes expected calls', () => {
      const httpErrorResponseStub: HttpErrorResponse = <any>{};
      const nzMessageServiceStub: NzMessageService = fixture.debugElement.injector.get(
        NzMessageService
      );
      spyOn(nzMessageServiceStub, 'error').and.callThrough();
      component.onAfterFailPersistRecord(httpErrorResponseStub);
      expect(nzMessageServiceStub.error).toHaveBeenCalled();
    });
  });

  describe('loadBpmFile', () => {
    it('makes expected calls', () => {
      const bpmFacadeStub: BpmFacade = fixture.debugElement.injector.get(
        BpmFacade
      );
      spyOn(bpmFacadeStub, 'loadNewFileAsync').and.callThrough();
      component.loadBpmFile();
      expect(bpmFacadeStub.loadNewFileAsync).toHaveBeenCalled();
    });
  });

  describe('onAfterSuccessfullyPersistRecord', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const nzMessageServiceStub: NzMessageService = fixture.debugElement.injector.get(
        NzMessageService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(nzMessageServiceStub, 'success').and.callThrough();
      component.onAfterSuccessfullyPersistRecord();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(nzMessageServiceStub.success).toHaveBeenCalled();
    });
  });
});
