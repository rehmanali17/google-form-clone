import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
    accessToken = '';
    constructor(private store: Store<AppState>) {
        this.store.select('auth').subscribe((authState) => {
            this.accessToken = authState.accessToken;
        });
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let modifiedRequest = req;
        if (req.url.includes('user')) {
            modifiedRequest = req.clone({
                headers: req.headers.append('Authorization', `Bearer ${this.accessToken}`),
            });
        }
        return next.handle(modifiedRequest);
    }
}
