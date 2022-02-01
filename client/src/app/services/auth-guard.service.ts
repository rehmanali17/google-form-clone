import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivateChild {
    constructor(
        private store: Store<AppState>,
        private router: Router,
        private cookieService: CookieService
    ) {}

    canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
        let isLoggedIn;
        this.store.select('auth').subscribe((authState) => {
            isLoggedIn = authState.isLoggedIn;
        });
        if (isLoggedIn === true || this.cookieService.get('payload') !== undefined) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
