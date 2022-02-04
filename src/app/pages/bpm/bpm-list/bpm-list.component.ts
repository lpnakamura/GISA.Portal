import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { BpmFacade } from '../bpm.facade';
import { BpmResponse } from './../models/bpm-response.interface';

@Component({
  selector: 'app-bpm-list',
  templateUrl: './bpm-list.component.html',
  styleUrls: ['./bpm-list.component.css']
})
export class BpmListComponent implements OnInit {
  public bpmList: BpmResponse[] = [];
  public bpmList$: Observable<BpmResponse[]>;

  constructor(private bpmFacade: BpmFacade, private messageService: NzMessageService) { }

  ngOnInit(): void {
    this.loadBpmList();
  }

  onRemoveRecord(bpmResponse: BpmResponse, recordIndex: number): void {
    this.bpmFacade.removeAsync(bpmResponse.id)
      .pipe(take(1))
      .subscribe(() => this.onAfterSuccessfullyRemovingRecord(recordIndex),
        (error: HttpErrorResponse) => this.onAfterFailRemovingRecord(error));
  }

  private loadBpmList(): void {
    this.bpmList$ = this.bpmFacade.getAllAsync()
      .pipe(take(1))
      .pipe(tap(bpmList => this.bpmList = bpmList));
  }

  private onAfterSuccessfullyRemovingRecord(recordIndex: number): void {
    this.messageService.success('Diagrama removido com sucesso!');
    this.bpmList.splice(recordIndex, 1);
    this.bpmList$ = of([...this.bpmList]);
  }

  private onAfterFailRemovingRecord(error: HttpErrorResponse): void {
    this.messageService.error(`Falha ao remover o diagrama: ${error?.message}`)
  }
}
