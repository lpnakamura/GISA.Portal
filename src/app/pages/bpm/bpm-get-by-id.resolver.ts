import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { BpmFacade } from './bpm.facade';
import { BpmResponse } from './models/bpm-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BpmGetByIdResolve implements Resolve<BpmResponse> {
  constructor(private bpmFacade: BpmFacade) { }

  resolve(route: ActivatedRouteSnapshot): Observable<BpmResponse> {
    return this.bpmFacade.getByIdAsync(route.params.id);
  }
}
