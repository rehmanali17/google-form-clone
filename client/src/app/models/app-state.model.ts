import { AuthState } from '@models/auth-state.model';
import { FormState } from '@models/form-state.model';
import { DialogBoxState } from '@models/dialog-box-state.model';

export interface AppState {
    auth: AuthState;
    form: FormState;
    dialogBox: DialogBoxState;
}
