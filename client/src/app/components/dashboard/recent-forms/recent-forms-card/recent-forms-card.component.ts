import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RecentForm } from '@models/recent-form.model';
import { ROUTES } from '@app/constants';

@Component({
    selector: 'app-recent-forms-card',
    templateUrl: './recent-forms-card.component.html',
    styleUrls: ['./recent-forms-card.component.scss'],
})
export class RecentFormsCardComponent implements OnInit {
    @Input() form!: RecentForm;
    @Input() createNewForm!: boolean;
    @Input() darkModeEnabled!: boolean;
    imageSource!: SafeResourceUrl;
    constructor(private router: Router, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        if (!this.createNewForm) {
            this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(this.form.imageString);
        }
    }

    handleCreateForm() {
        this.router.navigateByUrl(ROUTES.CREATE_FORM);
    }

    redirectToEditPage(id: string) {
        this.router.navigate([ROUTES.EDIT_FORM, id]);
    }
}
