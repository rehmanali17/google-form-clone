import { AppState } from '@models/app-state.model';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
    authSubscription!: Subscription;
    constructor(private router: Router, private store: Store<AppState>) {}

    ngOnInit() {
        this.authSubscription = this.store.select('auth').subscribe((authState) => {
            if (authState.isLoggedIn === true) {
                this.router.navigateByUrl('/user');
            }
        });
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }
}
