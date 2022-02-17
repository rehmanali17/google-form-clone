import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as DialogBoxActions from '@store/dialog-box/dialog-box.actions';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-share-form-dialog',
    templateUrl: './share-form-dialog.component.html',
    styleUrls: ['./share-form-dialog.component.scss'],
})
export class ShareFormDialogComponent implements OnInit, OnDestroy {
    darkModeEnabled = false;
    link = '';
    dialogBoxSubscription!: Subscription;
    constructor(
        private store: Store<AppState>,
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
            if (dialogBoxState.shareFormDialogBox.status === true) {
                this.link = dialogBoxState.shareFormDialogBox.link;
            }
        });
    }

    toggleSnackBar() {
        this.snackBar.open('Copied to clipboard.');
        setTimeout(() => {
            this.snackBar.dismiss();
        }, 500);
    }

    selectText(event: Event) {
        const element = event.target as HTMLInputElement;
        element.select();
    }

    closeDialogBox() {
        this.store.dispatch(new DialogBoxActions.CloseShareFormDialogBox());
    }

    ngOnDestroy() {
        this.dialogBoxSubscription.unsubscribe();
    }
}
