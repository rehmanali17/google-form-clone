import { Component } from '@angular/core';

@Component({
    selector: 'app-landing-page-navbar',
    templateUrl: './landing-page-navbar.component.html',
    styleUrls: ['./landing-page-navbar.component.scss'],
})
export class LandingPageNavbarComponent {
    openDrawer = false;
    constructor() {}

    handleGoogleLogin() {
        window.location.href = 'http://localhost:8080/api/auth/google';
    }

    toggleDrawerMenu(event: Event) {
        if (event.target === event.currentTarget) {
            this.openDrawer = false;
        }
    }
}
