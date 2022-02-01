import { AppState } from '@models/app-state.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';
import * as FormActions from '@store/form/form.actions';
import { FormService } from '@services/form.service';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '@components/dashboard/form-dialog/form-dialog.component';
import { RenameFormDialogComponent } from '@components/dashboard/rename-form-dialog/rename-form-dialog.component';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    isLoading = true;
    dialogBoxSubscription!: Subscription;
    formsSubscription!: Subscription;
    recentFormsSubscription!: Subscription;

    constructor(
        private cookieService: CookieService,
        private store: Store<AppState>,
        private formService: FormService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getCookiePayload();

        this.dialogBoxHandler();

        this.getForms();

        this.getRecentForms();
    }

    getCookiePayload() {
        if (this.cookieService.get('payload') !== undefined) {
            this.store.dispatch(
                new AuthActions.LoginSuccess(JSON.parse(this.cookieService.get('payload')))
            );
            this.cookieService.remove('payload');
        }
    }

    dialogBoxHandler() {
        this.dialogBoxSubscription = this.store.select('dialogBox').subscribe((dialogBoxState) => {
            if (dialogBoxState.deleteDialogBox.status === true) {
                this.dialog.open(FormDialogComponent);
            } else if (dialogBoxState.editDialogBox.status === true) {
                this.dialog.open(RenameFormDialogComponent);
            } else {
                this.dialog.closeAll();
            }
        });
    }

    getForms() {
        this.formsSubscription = this.formService.getForms().subscribe(
            (res) => {
                this.store.dispatch(new FormActions.FetchFormsSuccess(res.forms));
                this.isLoading = false;
            },
            (err) => {
                if (err.status === 401) {
                    this.snackBar.open(err.error.message, 'Close');
                    this.store.dispatch(new AuthActions.Logout());
                }
                this.store.dispatch(
                    new FormActions.FetchFormsError({ status: true, message: err.error.message })
                );
                this.isLoading = false;
            }
        );
    }

    getRecentForms() {
        this.recentFormsSubscription = this.formService.getRecentForms().subscribe(
            (res) => {
                this.store.dispatch(new FormActions.FetchRecentForms(res.forms));
            },
            (err) => {
                this.snackBar.open(err.error.message, 'Close');
                if (err.status === 401) {
                    this.store.dispatch(new AuthActions.Logout());
                }
            }
        );
    }

    ngOnDestroy() {
        this.dialogBoxSubscription.unsubscribe();
        this.formsSubscription.unsubscribe();
        this.recentFormsSubscription.unsubscribe();
    }
}
