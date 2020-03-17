import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.authenticationService.currentUserValue;
        console.dir(`Bearer ${currentUser["_token"]}`);
        if (currentUser && currentUser["_token"]) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser["_token"]}`
                }
            });
        }
        return next.handle(request);
    }
}