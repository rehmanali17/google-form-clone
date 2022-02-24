import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ROUTES } from '@app/constants';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import * as DialogBoxActions from '@store/dialog-box/dialog-box.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-saved-form-dialog',
    templateUrl: './saved-form-dialog.component.html',
    styleUrls: ['./saved-form-dialog.component.scss'],
})
export class SavedFormDialogComponent implements OnInit, OnDestroy {
    darkModeEnabled = false;
    isError = false;
    formTitle = '';
    message = '';
    dialogBoxSubscription!: Subscription;
    constructor(
        private store: Store<AppState>,
        private router: Router,
        private overlayContainer: OverlayContainer,
        @Inject(MAT_DIALOG_DATA) darkModeEnabled: boolean
    ) {
        this.darkModeEnabled = darkModeEnabled;
        if (this.darkModeEnabled) {
            (<HTMLElement>(
                this.overlayContainer.getContainerElement().children[1].children[0].children[0]
            )).style.backgroundColor = '#353D58';
        } else {
            (<HTMLElement>(
                this.overlayContainer.getContainerElement().children[1].children[0].children[0]
            )).style.backgroundColor = 'white';
        }
    }

    ngOnInit() {
        this.dialogBoxSubscription = this.store.select('dialogBox').subscribe((dialogBoxState) => {
            if (dialogBoxState.formDialogBox.status) {
                this.isError = dialogBoxState.formDialogBox.isError;
                this.formTitle = dialogBoxState.formDialogBox.title;
                this.message = dialogBoxState.formDialogBox.message;
            }
        });
    }

    closeDialogBox() {
        this.store.dispatch(new DialogBoxActions.CloseFormDialogBox());
    }

    closeDialogBoxAndRedirect() {
        this.store.dispatch(new DialogBoxActions.CloseFormDialogBox());
        this.router.navigateByUrl(ROUTES.DASHBOARD);
    }

    ngOnDestroy() {
        this.dialogBoxSubscription.unsubscribe();
    }
}
