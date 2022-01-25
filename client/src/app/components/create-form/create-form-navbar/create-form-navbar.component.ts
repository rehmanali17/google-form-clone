import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AuthActions from '@store/auth/auth.actions';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-create-form-navbar',
    templateUrl: './create-form-navbar.component.html',
    styleUrls: ['./create-form-navbar.component.scss'],
})
export class CreateFormNavbarComponent implements OnInit {
    pictureURL = '';
    constructor(private store: Store<AppState>, private router: Router) {}

    ngOnInit() {
        this.store.select('auth').subscribe((authState) => {
            this.pictureURL = authState.user.pictureURL;
        });
    }

    handleLogOut() {
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigateByUrl('/');
    }
}
