import { Router } from '@angular/router';
import * as AuthActions from '@store/auth/auth.actions';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-navbar',
    templateUrl: './dashboard-navbar.component.html',
    styleUrls: ['./dashboard-navbar.component.scss'],
})
export class DashboardNavbarComponent implements OnInit {
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
