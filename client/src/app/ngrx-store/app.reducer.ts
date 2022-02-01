import { AppState } from '@models/app-state.model';
import { authReducer } from '@store/auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { formReducer } from '@store/form/form.reducer';
import { dialogBoxReducer } from '@store/dialog-box/dialog-box.reducer';

export const appReducer: ActionReducerMap<AppState, any> = {
    auth: authReducer,
    form: formReducer,
    dialogBox: dialogBoxReducer,
};
