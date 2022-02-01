import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    isError = false;
    formTitle = '';
    message = '';
    dialogBoxSubscription!: Subscription;
    constructor(private store: Store<AppState>, private router: Router) {}

    ngOnInit() {
        this.dialogBoxSubscription = this.store.select('dialogBox').subscribe((dialogBoxState) => {
            if (dialogBoxState.formDialogBox.status === true) {
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
        this.router.navigateByUrl('/user');
    }

    ngOnDestroy() {
        this.dialogBoxSubscription.unsubscribe();
    }
}
