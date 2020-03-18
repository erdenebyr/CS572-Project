import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser["_token"]) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser["_token"]}`
                }
            });
        }
        // else{
        //     request.clone({
        //         setHeaders:{
        //             Authorization: `login`
        //         }
        //     })
        // }
        // console.dir(request);
        return next.handle(request);
    }
}