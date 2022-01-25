import { AppState } from '@models/app-state.model';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    constructor(private cookieService: CookieService, private store: Store<AppState>) {}

    ngOnInit(): void {
        if (this.cookieService.get('payload') !== undefined) {
            this.store.dispatch(
                new AuthActions.LoginSuccess(JSON.parse(this.cookieService.get('payload')))
            );
            this.cookieService.remove('payload');
        }
    }
}
