import { Form } from '@models/form.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as DialogBoxActions from '@store/dialog-box/dialog-box.actions';
import * as AuthActions from '@store/auth/auth.actions';
import * as FormActions from '@store/form/form.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '@models/app-state.model';
import { FormService } from '@services/form.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { LABELS, ROUTES } from '@app/constants';

@Component({
    selector: 'app-forms-grid-item',
    templateUrl: './forms-grid-item.component.html',
    styleUrls: ['./forms-grid-item.component.scss'],
})
export class FormsGridItemComponent implements OnInit {
    @Input() darkModeEnabled!: boolean;
    @Input() form!: Form;
    @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
    imageSource!: SafeResourceUrl;

    constructor(
        private sanitizer: DomSanitizer,
        private router: Router,
        private store: Store<AppState>,
        private snackBar: MatSnackBar,
        private formService: FormService
    ) {}

    ngOnInit() {
        this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(this.form.imageString!);
    }

    triggerMatMenu(event: Event) {
        event.preventDefault();
        this.trigger.openMenu();
    }

    removeForm(id: string, title: string) {
        this.store.dispatch(new DialogBoxActions.OpenDeleteDialogBox({ id, title }));
    }

    renameForm(id: string, title: string) {
        this.store.dispatch(new DialogBoxActions.OpenEditDialogBox({ id, title }));
    }

    publishForm(id: string) {
        const status = 'published';
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
        const link = environment.baseURL + '/fill-form/' + id;
        this.store.dispatch(new DialogBoxActions.OpenShareFormDialogBox({ link }));
    }

    redirectToEditPage(event: Event, id: string) {
        const element = event.target as HTMLElement;
        if (element.tagName === 'BUTTON' || element.tagName === 'MAT-ICON') {
            return;
        }
        this.router.navigate([ROUTES.EDIT_FORM, id]);
    }
}
