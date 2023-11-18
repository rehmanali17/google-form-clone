import { FormState } from '@models/form-state.model';
import * as FormActions from '@store/form/form.actions';

const initialState: FormState = {
    forms: [],
    recentForms: [],
    errorFetchingForms: {
        status: false,
        message: '',
    },
    isSavingForm: false,
    searchFormTitle: '',
};

export function formReducer(state = initialState, action: FormActions.FormActions) {
    switch (action.type) {
        case FormActions.FETCH_FORMS_SUCCESS:
            return {
                ...state,
                forms: action.payload,
                errorFetchingForms: {
                    status: false,
                    message: '',
                },
            };
        case FormActions.FETCH_FORMS_ERROR:
            return {
                ...state,
                forms: [],
                errorFetchingForms: {
                    status: action.payload.status,
                    message: action.payload.message,
                },
            };
        case FormActions.FETCH_RECENT_FORMS:
            return {
                ...state,
                recentForms: action.payload,
            };
        case FormActions.FETCH_FORMS_PICS_SUCCESS:
            return {
                ...state,
                forms: state.forms.map((form) => {
                    return {
                        ...form,
                        imageString: action.payload[form._id!],
                    };
                }),
            };
        case FormActions.REMOVE_FORM:
            return {
                ...state,
                forms: state.forms.filter((form) => form._id !== action.payload.id),
                recentForms: state.recentForms.filter(
                    (recentForm) => recentForm._id !== action.payload.id
                ),
            };
        case FormActions.RENAME_FORM:
            return {
                ...state,
                forms: state.forms.map((form) => {
                    let modifiedForm = { ...form };
                    if (modifiedForm._id === action.payload.id) {
                        modifiedForm.title = action.payload.title;
                        modifiedForm.updatedAt = action.payload.updatedAt;
                    }
                    return modifiedForm;
                }),
            };
        case FormActions.PUBLISH_FORM:
            return {
                ...state,
                forms: state.forms.map((form) => {
                    let modifiedForm = { ...form };
                    if (modifiedForm._id === action.payload.id) {
                        modifiedForm.status = action.payload.status;
                        modifiedForm.updatedAt = action.payload.updatedAt;
                    }
                    return modifiedForm;
                }),
            };
        case FormActions.TOGGLE_FORM_SAVING_STATUS:
            return {
                ...state,
                isSavingForm: action.payload.status,
            };
        case FormActions.SEARCH_FORMS:
            return {
                ...state,
                searchFormTitle: action.payload.formTitle,
            };
        default:
            return state;
    }
}
