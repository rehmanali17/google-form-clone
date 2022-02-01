import { DialogBoxState } from '@models/dialog-box-state.model';
import * as DialogBoxActions from '@store/dialog-box/dialog-box.actions';

const initialState: DialogBoxState = {
    deleteDialogBox: {
        status: false,
        id: '',
        title: '',
    },
    editDialogBox: {
        status: false,
        id: '',
        title: '',
    },
    formDialogBox: {
        status: false,
        isError: false,
        title: '',
        message: '',
    },
};

export function dialogBoxReducer(state = initialState, action: DialogBoxActions.DialogBoxActions) {
    switch (action.type) {
        case DialogBoxActions.OPEN_DELETE_DIALOG_BOX:
            return {
                ...state,
                deleteDialogBox: {
                    status: true,
                    id: action.payload.id,
                    title: action.payload.title,
                },
            };
        case DialogBoxActions.CLOSE_DELETE_DIALOG_BOX:
            return {
                ...state,
                deleteDialogBox: {
                    status: false,
                    id: '',
                    title: '',
                },
            };
        case DialogBoxActions.OPEN_EDIT_DIALOG_BOX:
            return {
                ...state,
                editDialogBox: {
                    status: true,
                    id: action.payload.id,
                    title: action.payload.title,
                },
            };
        case DialogBoxActions.CLOSE_EDIT_DIALOG_BOX:
            return {
                ...state,
                editDialogBox: {
                    status: false,
                    id: '',
                    title: '',
                },
            };
        case DialogBoxActions.OPEN_FORM_DIALOG_BOX:
            return {
                ...state,
                formDialogBox: {
                    status: true,
                    isError: action.payload.isError,
                    title: action.payload.title,
                    message: action.payload.message,
                },
            };
        case DialogBoxActions.CLOSE_FORM_DIALOG_BOX:
            return {
                ...state,
                formDialogBox: {
                    status: false,
                    isError: false,
                    title: '',
                    message: '',
                },
            };
        default:
            return state;
    }
}
