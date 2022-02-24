import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ALERTS, LABELS } from '@app/constants';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';

@Injectable({
    providedIn: 'root',
})
export class AutoLogoutService {
    public tokenExpirationTimer: any;
    constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {}

    autoLogOut(tokenExpirationDuration: number) {
        this.clearTokenExpirationTimer();
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
            this.snackBar.open(ALERTS.SESSION_TIMEOUT, LABELS.DISMISS_SNACKBAR_TEXT);
        }, tokenExpirationDuration);
    }

    clearTokenExpirationTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
}
