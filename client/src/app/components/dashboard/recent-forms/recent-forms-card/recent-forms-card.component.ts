import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-recent-forms-card',
    templateUrl: './recent-forms-card.component.html',
    styleUrls: ['./recent-forms-card.component.scss'],
})
export class RecentFormsCardComponent {
    constructor(private router: Router) {}

    handleCreateForm() {
        this.router.navigateByUrl('/user/create-form');
    }
}
