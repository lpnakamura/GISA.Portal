import { BpmRequest } from './models/bpm-request.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BpmService } from './bpm.service';
import { BpmResponse } from './models/bpm-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BpmFacade {
  constructor(private bpmService: BpmService) { }
  public loadNewFileAsync(): Observable<string> {
    return this.bpmService.loadNewFileAsync();
  }

  public loadFileAsync(url: string): Observable<string> {
    return this.bpmService.loadFileAsync(url);
  }

  public getAllAsync(): Observable<BpmResponse[]> {
    return this.bpmService.getAllAsync();
  }

  public getByIdAsync(id: string): Observable<BpmResponse> {
    return this.bpmService.getByIdAsync(id);
  }

  public removeAsync(id: string): Observable<void> {
    return this.bpmService.removeAsync(id);
  }

  public saveAsync(bpmRequest: BpmRequest): Observable<BpmResponse> {
    const formData = new FormData();
    formData.set('file', bpmRequest.file);
    formData.set('name', bpmRequest.name);
    formData.set('description', bpmRequest.description);
    return this.bpmService.saveAsync(formData);
  }

  public updateAsync(bpmRequest: BpmRequest): Observable<BpmResponse> {
    const formData = new FormData();
    formData.set('file', bpmRequest.file);
    formData.set('name', bpmRequest.name);
    formData.set('description', bpmRequest.description);
    formData.set('fileIdentifier', bpmRequest.fileIdentifier);
    return this.bpmService.updateAsync(bpmRequest.id, formData);
  }
}
