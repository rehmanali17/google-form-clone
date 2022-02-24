import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@models/app-state.model';
import { RecentForm } from '@models/recent-form.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recent-forms',
    templateUrl: './recent-forms.component.html',
    styleUrls: ['./recent-forms.component.scss'],
})
export class RecentFormsComponent implements OnInit, OnDestroy {
    @Input() darkModeEnabled!: boolean;
    forms: RecentForm[] = [];
    recentFormsSubscription!: Subscription;
    showTemplates = true;
    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.recentFormsSubscription = this.store.select('form').subscribe((formState) => {
            this.forms = formState.recentForms;
        });
    }

    toggleTemplates() {
        this.showTemplates = !this.showTemplates;
    }

    ngOnDestroy() {
        this.recentFormsSubscription.unsubscribe();
    }
}
