import { AppState } from '@models/app-state.model';
import { authReducer } from '@store/auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const appReducer: ActionReducerMap<AppState, any> = {
    auth: authReducer,
};
