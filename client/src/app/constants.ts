import { environment } from '@environments/environment';

export const REQUEST_URLS = {
    LOGIN_URL: `${environment.apiURL}/api/auth/google`,
    CREATE_FORM_URL: `${environment.apiURL}/api/user/form`,
    GET_FORMS_URL: `${environment.apiURL}/api/user/form`,
    GET_RECENT_FORMS_URL: `${environment.apiURL}/api/user/form/recent`,
    GET_FORMS_PICS_URL: `${environment.apiURL}/api/user/form/pics`,
    DELETE_FORM_URL: `${environment.apiURL}/api/user/form`,
    RENAME_FORM_URL: `${environment.apiURL}/api/user/form`,
    PUBLISH_FORM_URL: `${environment.apiURL}/api/user/form`,
    EDIT_FORM_URL: `${environment.apiURL}/api/user/form`,
    GET_FORM_URL: `${environment.apiURL}/api/form`,
    FILL_FORM: '/fill-form/',
};

export const ALERTS = {
    ZERO_FORM_EXIST: 'No form has been created yet',
    MESSAGE_COPIED: 'Copied to clipboard.',
    INVALID_FORM: 'Please fill all the fields correctly',
    REQUIRED_QUESTION: 'This question is required',
    REQUIRED_OPTION: 'Option field is required',
    UNPUBLISHED_FORM: 'Form is not published yet',
    SESSION_TIMEOUT: 'Session expired',
};

export const LABELS = {
    DISMISS_SNACKBAR_TEXT: 'Close',
};

export const ROUTES = {
    LANDING_PAGE: '/',
    DASHBOARD: '/user',
    CREATE_FORM: '/user/create-form',
    EDIT_FORM: '/user/edit-form',
    FILL_FORM: '/fill-form',
};

export const ELEMENTS = {
    BUTTON: 'BUTTON',
    MAT_ICON: 'MAT-ICON',
};

export const FORM_STATUS = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
};

export const VIEW_TYPES = {
    GRID: 'grid',
    LIST: 'list',
};

export const AUTH_PAYLOAD = 'payload';
