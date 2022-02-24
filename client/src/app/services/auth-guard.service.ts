import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { AutoLogoutService } from './auto-logout.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivateChild {
    constructor(
        private store: Store<AppState>,
        private router: Router,
        private cookieService: CookieService,
        private autoLogoutService: AutoLogoutService
    ) {}

    canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
        let isLoggedIn;
        this.store.select('auth').subscribe((authState) => {
            isLoggedIn = authState.isLoggedIn;
        });
        if (isLoggedIn === true || this.cookieService.get('payload')) {
            let sessionDuration = 0;
            if (this.cookieService.get('payload')) {
                sessionDuration = 60 * 60 * 1000;
                const tokenExpirationDuration = new Date().getTime() + 60 * 60 * 1000;
                localStorage.setItem('tokenExpirationDuration', tokenExpirationDuration.toString());
            } else {
                sessionDuration =
                    +localStorage.getItem('tokenExpirationDuration')! - new Date().getTime();
            }
            this.autoLogoutService.autoLogOut(sessionDuration);
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
