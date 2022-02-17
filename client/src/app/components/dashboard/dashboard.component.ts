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
import { ShareFormDialogComponent } from '@components/dashboard/share-form-dialog/share-form-dialog.component';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DarkModeService } from '@services/dark-mode.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    isLoading = true;
    darkModeEnabled = false;

    dialogBoxSubscription!: Subscription;
    formsSubscription!: Subscription;
    recentFormsSubscription!: Subscription;
    darkModeSubscription!: Subscription;

    constructor(
        private cookieService: CookieService,
        private store: Store<AppState>,
        private formService: FormService,
        private darkModeService: DarkModeService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getCookiePayload();

        this.dialogBoxHandler();

        this.getForms();

        this.getRecentForms();

        this.toggleDarkMode();
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
                this.dialog.open(FormDialogComponent, {
                    data: this.darkModeEnabled,
                    autoFocus: true,
                });
            } else if (dialogBoxState.editDialogBox.status === true) {
                this.dialog.open(RenameFormDialogComponent, {
                    data: this.darkModeEnabled,
                    autoFocus: true,
                });
            } else if (dialogBoxState.shareFormDialogBox.status === true) {
                this.dialog.open(ShareFormDialogComponent, {
                    width: '375px',
                    data: this.darkModeEnabled,
                    autoFocus: true,
                });
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

    toggleDarkMode() {
        this.darkModeSubscription = this.darkModeService.darkMode.subscribe((mode) => {
            if (mode === true) {
                this.darkModeEnabled = true;
            } else {
                this.darkModeEnabled = false;
            }
        });
    }

    ngOnDestroy() {
        this.dialogBoxSubscription.unsubscribe();
        this.formsSubscription.unsubscribe();
        this.recentFormsSubscription.unsubscribe();
        this.darkModeSubscription.unsubscribe();
    }
}
