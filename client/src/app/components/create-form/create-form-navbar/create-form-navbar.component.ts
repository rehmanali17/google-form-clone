import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as AuthActions from '@store/auth/auth.actions';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-create-form-navbar',
    templateUrl: './create-form-navbar.component.html',
    styleUrls: ['./create-form-navbar.component.scss'],
})
export class CreateFormNavbarComponent implements OnInit, OnDestroy {
    @Input() darkModeEnabled!: boolean;
    @Output() saveForm = new EventEmitter<string>();
    userName = '';
    pictureURL = '';
    isSavingForm = false;
    authSubscription!: Subscription;
    @Input() formStatus = '';
    constructor(private store: Store<AppState>, private router: Router) {}

    ngOnInit() {
        this.authSubscription = this.store.select('auth').subscribe((authState) => {
            this.userName = authState.user.name;
            this.pictureURL = authState.user.pictureURL;
        });
        this.store.select('form').subscribe((formState) => {
            if (formState.isSavingForm === true) {
                this.isSavingForm = true;
            } else {
                this.isSavingForm = false;
            }
        });
    }

    handleLogOut() {
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigateByUrl('/');
    }

    handleFormSubmit(status: string) {
        if (this.formStatus === 'published') {
            this.saveForm.emit(this.formStatus);
        } else {
            this.saveForm.emit(status);
        }
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }
}
