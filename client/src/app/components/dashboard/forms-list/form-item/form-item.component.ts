import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '@models/app-state.model';
import { Form } from '@models/form.model';
import { Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import * as DialogBoxActions from '@store/dialog-box/dialog-box.actions';
import * as AuthActions from '@store/auth/auth.actions';
import * as FormActions from '@store/form/form.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { LABELS, ROUTES, REQUEST_URLS, ELEMENTS, FORM_STATUS } from '@app/constants';

@Component({
    selector: 'app-form-item',
    templateUrl: './form-item.component.html',
    styleUrls: ['./form-item.component.scss'],
})
export class FormItemComponent implements OnInit {
    @Input() darkModeEnabled!: boolean;
    @Input() form!: Form;
    isTodayModified = true;
    constructor(
        private store: Store<AppState>,
        private formService: FormService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        const date = new Date().getDate();
        const month = new Date().getMonth();
        const formModifiedDate = new Date(this.form.updatedAt!).getDate();
        const formModifiedMonth = new Date(this.form.updatedAt!).getMonth();
        if (date > formModifiedDate || month > formModifiedMonth) {
            this.isTodayModified = false;
        }
    }

    removeForm(id: string, title: string) {
        this.store.dispatch(new DialogBoxActions.OpenDeleteDialogBox({ id, title }));
    }

    renameForm(id: string, title: string) {
        this.store.dispatch(new DialogBoxActions.OpenEditDialogBox({ id, title }));
    }

    publishForm(id: string) {
        const status = FORM_STATUS.PUBLISHED;
        this.formService.publishForm(id, status).subscribe(
            (res) => {
                this.store.dispatch(
                    new FormActions.PublishForm({ id, status, updatedAt: new Date() })
                );
                this.snackBar.open(res.message, LABELS.DISMISS_SNACKBAR_TEXT);
            },
            (err) => {
                this.snackBar.open(err.error.message, LABELS.DISMISS_SNACKBAR_TEXT);
                if (err.status === 401) {
                    this.store.dispatch(new AuthActions.Logout());
                }
            }
        );
    }

    shareForm(id: string) {
        const link = environment.baseURL + REQUEST_URLS.FILL_FORM + id;
        this.store.dispatch(new DialogBoxActions.OpenShareFormDialogBox({ link }));
    }

    redirectToEditPage(event: Event, id: string) {
        const element = event.target as HTMLElement;
        if (element.tagName === ELEMENTS.BUTTON || element.tagName === ELEMENTS.MAT_ICON) {
            return;
        }
        this.router.navigate([ROUTES.EDIT_FORM, id]);
    }
}
