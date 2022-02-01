import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as AuthActions from '@store/auth/auth.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private router: Router) {}

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
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    this.router.navigateByUrl('/');
                })
            ),
        { dispatch: false }
    );
}
