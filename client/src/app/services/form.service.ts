import { AppState } from '@models/app-state.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Form } from '@models/form.model';
import {
    CREATE_FORM_URL,
    DELETE_FORM_URL,
    GET_FORMS_URL,
    GET_RECENT_FORMS_URL,
    RENAME_FORM_URL,
    PUBLISH_FORM_URL,
    EDIT_FORM_URL,
} from '@app/utils/request-url';

@Injectable({
    providedIn: 'root',
})
export class FormService {
    accessToken = '';
    constructor(private httpClient: HttpClient, private store: Store<AppState>) {
        this.store.select('auth').subscribe((authState) => {
            this.accessToken = authState.accessToken;
        });
    }

    // Create Forms
    createForm(form: Form): Observable<any> {
        return this.httpClient.post<any>(CREATE_FORM_URL, {
            form,
        });
    }

    // Get Forms
    getForms(): Observable<any> {
        return this.httpClient.get<any>(GET_FORMS_URL);
    }

    // Get Recent Forms
    getRecentForms(): Observable<any> {
        return this.httpClient.get<any>(GET_RECENT_FORMS_URL);
    }

    // Delete Form
    deleteForm(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${DELETE_FORM_URL}/${id}`);
    }

    // Rename Form
    renameForm(id: string, title: string): Observable<any> {
        return this.httpClient.put<any>(`${RENAME_FORM_URL}/${id}`, { title });
    }

    // Publish Form
    publishForm(id: string, status: string): Observable<any> {
        return this.httpClient.put<any>(`${PUBLISH_FORM_URL}/${id}`, { status });
    }

    // Create Forms
    editForm(form: Form, id: string): Observable<any> {
        return this.httpClient.put<any>(`${EDIT_FORM_URL}/${id}`, {
            form,
        });
    }
}
