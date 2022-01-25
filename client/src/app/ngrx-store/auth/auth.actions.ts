import { Action } from '@ngrx/store';
import { User } from '@models/user.model';

export const LOGIN_SUCCESS = 'LOGIN_SUCESS';
export const LOGOUT = 'LOGOUT';

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: { user: User; accessToken: string; statusCode: number }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export type AuthActions = LoginSuccess | Logout;
