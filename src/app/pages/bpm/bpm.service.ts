import { Observable } from 'rxjs';
import { BpmResponse } from './models/bpm-response.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BpmService {
  constructor(private httpClient: HttpClient) { }

  public loadNewFileAsync(): Observable<string> {
    return this.httpClient.get(`${environment.BPM_BASE_URL}diagram.xml`, { responseType: 'text' });
  }

  public loadFileAsync(url: string): Observable<string> {
    return this.httpClient.get(url, { responseType: 'text' });
  }

  public getByIdAsync(id: string): Observable<BpmResponse> {
    return this.httpClient.get<BpmResponse>(`${environment.BPM_BASE_URL}api/v1/workflow/${id}`);
  }

  public getAllAsync(): Observable<BpmResponse[]> {
    return this.httpClient.get<BpmResponse[]>(`${environment.BPM_BASE_URL}api/v1/workflow`);
  }

  public saveAsync(formData: FormData): Observable<BpmResponse> {
    return this.httpClient.post<BpmResponse>(`${environment.BPM_BASE_URL}api/v1/workflow`, formData);
  }

  public updateAsync(id: string, formData: FormData): Observable<BpmResponse> {
    return this.httpClient.put<BpmResponse>(`${environment.BPM_BASE_URL}api/v1/workflow/${id}`, formData);
  }

  public removeAsync(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.BPM_BASE_URL}api/v1/workflow/${id}`);
  }
}
