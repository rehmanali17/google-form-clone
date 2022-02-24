import { Action } from '@ngrx/store';
import { Form } from '@models/form.model';
import { RecentForm } from '@models/recent-form.model';

export const FETCH_FORMS_SUCCESS = 'FETCH_FORMS_SUCCESS';
export const FETCH_FORMS_ERROR = 'FETCH_FORMS_ERROR';
export const REMOVE_FORM = 'REMOVE_FORM';
export const RENAME_FORM = 'RENAME_FORM';
export const PUBLISH_FORM = 'PUBLISH_FORM';
export const FETCH_RECENT_FORMS = 'FETCH_RECENT_FORMS';
export const TOGGLE_FORM_SAVING_STATUS = 'TOGGLE_FORM_SAVING_STATUS';
export const SEARCH_FORMS = 'SEARCH_FORMS';
export const FETCH_FORMS_PICS_SUCCESS = 'FETCH_FORMS_PICS_SUCCESS';

export class FetchFormsSuccess implements Action {
    readonly type = FETCH_FORMS_SUCCESS;
    constructor(public payload: Form[]) {}
}

export class FetchFormsError implements Action {
    readonly type = FETCH_FORMS_ERROR;
    constructor(public payload: { status: boolean; message: string }) {}
}

export class FetchRecentForms implements Action {
    readonly type = FETCH_RECENT_FORMS;
    constructor(public payload: RecentForm[]) {}
}

export class RemoveForm implements Action {
    readonly type = REMOVE_FORM;
    constructor(public payload: { id: string }) {}
}

export class RenameForm implements Action {
    readonly type = RENAME_FORM;
    constructor(public payload: { id: string; title: string; updatedAt: Date }) {}
}

export class PublishForm implements Action {
    readonly type = PUBLISH_FORM;
    constructor(public payload: { id: string; status: string; updatedAt: Date }) {}
}

export class ToggleFormSavingStatus implements Action {
    readonly type = TOGGLE_FORM_SAVING_STATUS;
    constructor(public payload: { status: boolean }) {}
}

export class SearchForms implements Action {
    readonly type = SEARCH_FORMS;
    constructor(public payload: { formTitle: string }) {}
}

export class FetchFormsPicsSuccess implements Action {
    readonly type = FETCH_FORMS_PICS_SUCCESS;
    constructor(public payload: any) {}
}

export type FormActions =
    | FetchFormsSuccess
    | FetchFormsError
    | FetchRecentForms
    | RemoveForm
    | RenameForm
    | PublishForm
    | ToggleFormSavingStatus
    | SearchForms
    | FetchFormsPicsSuccess;
