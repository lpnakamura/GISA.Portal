import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { HttpInterceptorService } from './http.interceptor';

@NgModule({
    providers: [
        HttpInterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
    ],
})
export class HttpInterceptorModule { }
