import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '@app/constants';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AutoLogoutService } from '@services/auto-logout.service';
import * as AuthActions from '@store/auth/auth.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private autoLogoutService: AutoLogoutService
    ) {}

    loginSuccess = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.LOGIN_SUCCESS),
                tap((action: AuthActions.LoginSuccess) => {
                    localStorage.setItem('accessToken', action.payload.accessToken);
                    localStorage.setItem('user', JSON.stringify(action.payload.user));
                })
            ),
        { dispatch: false }
    );

    logout = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.LOGOUT),
                tap(() => {
                    this.autoLogoutService.clearTokenExpirationTimer();
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('tokenExpirationDuration');
                    localStorage.removeItem('user');
                    this.router.navigateByUrl(ROUTES.LANDING_PAGE);
                })
            ),
        { dispatch: false }
    );
}
