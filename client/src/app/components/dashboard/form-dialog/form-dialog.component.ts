import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import * as FormActions from '@store/form/form.actions';
import * as AuthActions from '@store/auth/auth.actions';
import * as DialogBoxActions from '@store/dialog-box/dialog-box.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit, OnDestroy {
    formId = '';
    formTitle = '';
    dialogBoxSubscription!: Subscription;
    constructor(
        private store: Store<AppState>,
        private formService: FormService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.dialogBoxSubscription = this.store.select('dialogBox').subscribe((dialogBoxState) => {
            if (dialogBoxState.deleteDialogBox.status === true) {
                this.formId = dialogBoxState.deleteDialogBox.id;
                this.formTitle = dialogBoxState.deleteDialogBox.title;
            }
        });
    }

    deleteForm() {
        this.formService.deleteForm(this.formId).subscribe(
            (res) => {
                this.store.dispatch(new FormActions.RemoveForm({ id: this.formId }));
                this.snackBar.open(res.message, 'Close');
            },
            (err) => {
                this.snackBar.open(err.error.message, 'Close');
                if (err.status === 401) {
                    this.store.dispatch(new AuthActions.Logout());
                }
            }
        );
        this.store.dispatch(new DialogBoxActions.CloseDeleteDialogBox());
    }

    closeDialogBox() {
        this.store.dispatch(new DialogBoxActions.CloseDeleteDialogBox());
    }

    ngOnDestroy() {
        this.dialogBoxSubscription.unsubscribe();
    }
}
