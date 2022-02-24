import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DarkModeService {
    public darkMode = new BehaviorSubject(false);

    constructor() {
        this.setCurrentMode();
    }

    toggleDarkMode() {
        const mode = !this.darkMode.value;
        const htmlTag = document.getElementsByTagName('html')[0];
        if (mode === true) {
            localStorage.setItem('darkModeEnabled', 'true');
            htmlTag.classList.add('dark');
        } else {
            localStorage.setItem('darkModeEnabled', 'false');
            htmlTag.classList.remove('dark');
        }
        this.darkMode.next(!this.darkMode.value);
    }

    setCurrentMode() {
        const mode = localStorage.getItem('darkModeEnabled') ?? 'false';
        const htmlTag = document.getElementsByTagName('html')[0];
        if (mode === 'true') {
            this.darkMode.next(true);
            htmlTag.classList.add('dark');
        } else {
            this.darkMode.next(false);
            htmlTag.classList.remove('dark');
        }
    }
}
