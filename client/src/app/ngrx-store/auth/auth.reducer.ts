import { AuthState } from '@models/auth-state.model';
import * as AuthActions from '@store/auth/auth.actions';

const accessToken = localStorage.getItem('accessToken') ?? '';
const isLoggedIn = accessToken ? true : false;
const user = accessToken
    ? JSON.parse(localStorage.getItem('user')!)
    : { _id: '', name: '', email: '', pictureURL: '', createdAt: new Date() };

const initialState: AuthState = {
    isLoggedIn,
    accessToken,
    user,
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                accessToken: action.payload.accessToken,
                user: action.payload.user,
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                accessToken: '',
                user: initialState.user,
            };
        default:
            return state;
    }
}
