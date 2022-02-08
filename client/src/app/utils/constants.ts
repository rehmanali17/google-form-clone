import { environment } from '@environments/environment';

export const REQUEST_URLS = {
    LOGIN_URL: `${environment.apiURL}/api/auth/google`,
    CREATE_FORM_URL: `${environment.apiURL}/api/user/create-form`,
    GET_FORMS_URL: `${environment.apiURL}/api/user/get-all-forms`,
    GET_RECENT_FORMS_URL: `${environment.apiURL}/api/user/get-recent-forms`,
    DELETE_FORM_URL: `${environment.apiURL}/api/user/delete-form`,
    RENAME_FORM_URL: `${environment.apiURL}/api/user/update-form-title`,
    PUBLISH_FORM_URL: `${environment.apiURL}/api/user/update-form-status`,
    EDIT_FORM_URL: `${environment.apiURL}/api/user/edit-form`,
    GET_FORM_URL: `${environment.apiURL}/api/form/get-form`,
};
