import { Router } from '@angular/router';
import * as AuthActions from '@store/auth/auth.actions';
import * as FormActions from '@store/form/form.actions';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Form } from '@models/form.model';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-dashboard-navbar',
    templateUrl: './dashboard-navbar.component.html',
    styleUrls: ['./dashboard-navbar.component.scss'],
})
export class DashboardNavbarComponent implements OnInit, OnDestroy {
    userName = '';
    pictureURL = '';
    forms: Form[] = [];
    title = new FormControl('');

    authSubscription!: Subscription;
    formsSubscription!: Subscription;
    formControlSubscription!: Subscription;

    filterTitle = '';
    constructor(private store: Store<AppState>, private router: Router) {}

    ngOnInit() {
        this.authSubscription = this.store.select('auth').subscribe((authState) => {
            this.userName = authState.user.name;
            this.pictureURL = authState.user.pictureURL;
        });

        this.formsSubscription = this.store.select('form').subscribe((formState) => {
            this.forms = formState.forms;
        });

        this.formControlSubscription = this.title.valueChanges.subscribe((value) => {
            this.filterTitle = value;
        });
    }

    handleLogOut() {
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigateByUrl('/');
    }

    clearValue() {
        this.title.setValue('');
        this.store.dispatch(new FormActions.SearchForms({ formTitle: '' }));
    }

    searchForms(title: string) {
        this.store.dispatch(new FormActions.SearchForms({ formTitle: title }));
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
        this.formsSubscription.unsubscribe();
        this.formControlSubscription.unsubscribe();
    }
}
