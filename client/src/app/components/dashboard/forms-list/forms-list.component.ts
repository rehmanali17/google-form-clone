import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import { Form } from '@models/form.model';
import { Subscription } from 'rxjs';
import { FormService } from '@services/form.service';
import * as FormActions from '@store/form/form.actions';
import { ALERTS } from '@app/constants';

@Component({
    selector: 'app-forms-list',
    templateUrl: './forms-list.component.html',
    styleUrls: ['./forms-list.component.scss'],
})
export class FormsListComponent implements OnInit, OnDestroy {
    @Input() darkModeEnabled!: boolean;
    forms: Form[] = [];
    isError = false;
    message = '';
    loadImages = false;
    formsSubscription!: Subscription;
    searchFormsSubscription!: Subscription;
    filterTitle = '';
    viewType = 'list';
    imagesLoading = true;
    constructor(private store: Store<AppState>, private formService: FormService) {}

    ngOnInit() {
        this.formsSubscription = this.store.select('form').subscribe((formState) => {
            if (formState.errorFetchingForms.status === true) {
                this.isError = formState.errorFetchingForms.status;
                this.message = formState.errorFetchingForms.message;
            } else if (formState.forms.length === 0) {
                this.imagesLoading = false;
                this.isError = true;
                this.message = ALERTS.ZERO_FORM_EXIST;
            } else {
                this.loadImages = formState.forms[0].imageString === '' ? true : false;
                this.forms = [...formState.forms];
            }
        });

        this.searchFormsSubscription = this.store.select('form').subscribe((formState) => {
            this.filterTitle = formState.searchFormTitle;
        });
    }

    sortForms(type: 'title' | 'status' | 'updatedAt') {
        this.forms.sort((a, b) => (a[type]! > b[type]! ? 1 : a[type]! < b[type]! ? -1 : 0));
    }

    toggleFormView(viewType: string) {
        if (viewType === 'grid' && this.loadImages) {
            this.formService.getFormsPics().subscribe(
                (res) => {
                    this.imagesLoading = false;
                    this.store.dispatch(new FormActions.FetchFormsPicsSuccess(res.formImages));
                },
                (err) => {
                    this.imagesLoading = false;
                    this.isError = true;
                    this.message = err.error.message;
                }
            );
        } else {
            if (this.forms.length === 0) {
                this.isError = true;
                this.message = ALERTS.ZERO_FORM_EXIST;
            } else {
                this.isError = false;
            }
        }
        this.viewType = viewType;
    }

    ngOnDestroy() {
        this.formsSubscription.unsubscribe();
        this.searchFormsSubscription.unsubscribe();
    }
}
