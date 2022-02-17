import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import * as FormActions from '@store/form/form.actions';
import * as AuthActions from '@store/auth/auth.actions';
import * as DialogBoxActions from '@store/dialog-box/dialog-box.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit, OnDestroy {
    formId = '';
    formTitle = '';
    dialogBoxSubscription!: Subscription;
    darkModeEnabled = false;
    constructor(
        private store: Store<AppState>,
        private formService: FormService,
        private snackBar: MatSnackBar,
        private overlayContainer: OverlayContainer,
        @Inject(MAT_DIALOG_DATA) darkModeEnabled: boolean
    ) {
        this.darkModeEnabled = darkModeEnabled;
        if (this.darkModeEnabled === true) {
            (<HTMLElement>(
                this.overlayContainer.getContainerElement().children[3].children[0].children[0]
            )).style.backgroundColor = '#353D58';
        } else {
            (<HTMLElement>(
                this.overlayContainer.getContainerElement().children[3].children[0].children[0]
            )).style.backgroundColor = 'white';
        }
    }

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
