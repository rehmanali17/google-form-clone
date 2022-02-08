import { Action } from '@ngrx/store';

export const OPEN_DELETE_DIALOG_BOX = 'OPEN_DELETE_DIALOG_BOX';
export const CLOSE_DELETE_DIALOG_BOX = 'CLOSE_DELETE_DIALOG_BOX';
export const OPEN_EDIT_DIALOG_BOX = 'OPEN_EDIT_DIALOG_BOX';
export const CLOSE_EDIT_DIALOG_BOX = 'CLOSE_EDIT_DIALOG_BOX';
export const OPEN_FORM_DIALOG_BOX = 'OPEN_FORM_DIALOG_BOX';
export const CLOSE_FORM_DIALOG_BOX = 'CLOSE_FORM_DIALOG_BOX';
export const OPEN_SHARE_FORM_DIALOG_BOX = 'OPEN_SHARE_FORM_DIALOG_BOX';
export const CLOSE_SHARE_FORM_DIALOG_BOX = 'CLOSE_SHARE_FORM_DIALOG_BOX';

export class OpenDeleteDialogBox implements Action {
    readonly type = OPEN_DELETE_DIALOG_BOX;
    constructor(public payload: { id: string; title: string }) {}
}

export class CloseDeleteDialogBox implements Action {
    readonly type = CLOSE_DELETE_DIALOG_BOX;
    constructor() {}
}

export class OpenEditDialogBox implements Action {
    readonly type = OPEN_EDIT_DIALOG_BOX;
    constructor(public payload: { id: string; title: string }) {}
}

export class CloseEditDialogBox implements Action {
    readonly type = CLOSE_EDIT_DIALOG_BOX;
    constructor() {}
}

export class OpenFormDialogBox implements Action {
    readonly type = OPEN_FORM_DIALOG_BOX;
    constructor(public payload: { isError: boolean; title: string; message: string }) {}
}

export class CloseFormDialogBox implements Action {
    readonly type = CLOSE_FORM_DIALOG_BOX;
    constructor() {}
}

export class OpenShareFormDialogBox implements Action {
    readonly type = OPEN_SHARE_FORM_DIALOG_BOX;
    constructor(public payload: { link: string }) {}
}

export class CloseShareFormDialogBox implements Action {
    readonly type = CLOSE_SHARE_FORM_DIALOG_BOX;
    constructor() {}
}

export type DialogBoxActions =
    | OpenDeleteDialogBox
    | CloseDeleteDialogBox
    | OpenEditDialogBox
    | CloseEditDialogBox
    | OpenFormDialogBox
    | CloseFormDialogBox
    | OpenShareFormDialogBox
    | CloseShareFormDialogBox;
