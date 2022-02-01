import { Component } from '@angular/core';
import { LOGIN_URL } from '@utils/request-url';
@Component({
    selector: 'app-landing-page-navbar',
    templateUrl: './landing-page-navbar.component.html',
    styleUrls: ['./landing-page-navbar.component.scss'],
})
export class LandingPageNavbarComponent {
    openDrawer = false;
    constructor() {}

    handleGoogleLogin() {
        window.location.href = LOGIN_URL;
    }

    toggleDrawerMenu(event: Event) {
        if (event.target === event.currentTarget) {
            this.openDrawer = false;
        }
    }
}
