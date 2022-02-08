import { AppState } from '@models/app-state.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Form } from '@models/form.model';
import { REQUEST_URLS } from '@utils/constants';

@Injectable({
    providedIn: 'root',
})
export class FormService {
    constructor(private httpClient: HttpClient) {}

    // Create Forms
    createForm(form: Form): Observable<any> {
        return this.httpClient.post<any>(REQUEST_URLS.CREATE_FORM_URL, {
            form,
        });
    }

    // Get Forms
    getForms(): Observable<any> {
        return this.httpClient.get<any>(REQUEST_URLS.GET_FORMS_URL);
    }

    // Get Single Form
    getForm(id: string): Observable<any> {
        return this.httpClient.get<any>(`${REQUEST_URLS.GET_FORM_URL}/${id}`);
    }

    // Get Recent Forms
    getRecentForms(): Observable<any> {
        return this.httpClient.get<any>(REQUEST_URLS.GET_RECENT_FORMS_URL);
    }

    // Delete Form
    deleteForm(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${REQUEST_URLS.DELETE_FORM_URL}/${id}`);
    }

    // Rename Form
    renameForm(id: string, title: string): Observable<any> {
        return this.httpClient.patch<any>(`${REQUEST_URLS.RENAME_FORM_URL}/${id}`, { title });
    }

    // Publish Form
    publishForm(id: string, status: string): Observable<any> {
        return this.httpClient.patch<any>(`${REQUEST_URLS.PUBLISH_FORM_URL}/${id}`, { status });
    }

    // Create Forms
    editForm(form: Form, id: string): Observable<any> {
        return this.httpClient.put<any>(`${REQUEST_URLS.EDIT_FORM_URL}/${id}`, {
            form,
        });
    }
}
