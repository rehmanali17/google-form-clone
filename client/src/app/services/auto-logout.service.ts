import { Injectable } from '@angular/core';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';

@Injectable({
    providedIn: 'root',
})
export class AutoLogoutService {
    public tokenExpirationTimer: any;
    constructor(private store: Store<AppState>) {}

    autoLogOut(tokenExpirationDuration: number) {
        this.clearTokenExpirationTimer();
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        }, tokenExpirationDuration);
    }

    clearTokenExpirationTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
}
