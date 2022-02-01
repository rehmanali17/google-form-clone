import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import * as FormActions from '@store/form/form.actions';
import * as AuthActions from '@store/auth/auth.actions';
import * as DialogBoxActions from '@store/dialog-box/dialog-box.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-rename-form-dialog',
    templateUrl: './rename-form-dialog.component.html',
    styleUrls: ['./rename-form-dialog.component.scss'],
})
export class RenameFormDialogComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('title') title!: ElementRef;
    dialogBoxSubscription!: Subscription;
    form = new FormGroup({
        title: new FormControl(null, [Validators.required]),
    });
    formId = '';

    constructor(
        private store: Store<AppState>,
        private formService: FormService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.dialogBoxSubscription = this.store.select('dialogBox').subscribe((dialogBoxState) => {
            if (dialogBoxState.editDialogBox.status === true) {
                this.formId = dialogBoxState.editDialogBox.id;
                this.form.get('title')?.setValue(dialogBoxState.editDialogBox.title);
            }
        });
    }

    ngAfterViewInit() {
        this.title.nativeElement.focus();
    }

    handleFormSubmit() {
        const { title } = this.form.value;
        this.formService.renameForm(this.formId, title).subscribe(
            (res) => {
                this.store.dispatch(
                    new FormActions.RenameForm({ id: this.formId, title, updatedAt: new Date() })
                );
                this.snackBar.open(res.message, 'Close');
            },
            (err) => {
                this.snackBar.open(err.error.message, 'Close');
                if (err.status === 401) {
                    this.store.dispatch(new AuthActions.Logout());
                }
            }
        );
        this.store.dispatch(new DialogBoxActions.CloseEditDialogBox());
    }

    closeDialogBox() {
        this.store.dispatch(new DialogBoxActions.CloseEditDialogBox());
    }

    ngOnDestroy() {
        this.dialogBoxSubscription.unsubscribe();
    }
}
