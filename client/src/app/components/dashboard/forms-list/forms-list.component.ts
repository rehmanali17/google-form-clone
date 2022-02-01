import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import { Form } from '@models/form.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-forms-list',
    templateUrl: './forms-list.component.html',
    styleUrls: ['./forms-list.component.scss'],
})
export class FormsListComponent implements OnInit, OnDestroy {
    forms: Form[] = [];
    isError = false;
    message = '';
    formsSubscription!: Subscription;
    searchFormsSubscription!: Subscription;
    filterTitle = '';
    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.formsSubscription = this.store.select('form').subscribe((formState) => {
            if (formState.errorFetchingForms.status === true) {
                this.isError = formState.errorFetchingForms.status;
                this.message = formState.errorFetchingForms.message;
            } else if (formState.forms.length === 0) {
                this.isError = true;
                this.message = 'No form has been created yet';
            } else {
                this.forms = formState.forms;
            }
        });

        this.searchFormsSubscription = this.store.select('form').subscribe((formState) => {
            this.filterTitle = formState.searchFormTitle;
        });
    }

    ngOnDestroy() {
        this.formsSubscription.unsubscribe();
        this.searchFormsSubscription.unsubscribe();
    }
}
