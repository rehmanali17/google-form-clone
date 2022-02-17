import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-form-header',
    templateUrl: './form-header.component.html',
    styleUrls: ['./form-header.component.scss'],
})
export class FormHeaderComponent {
    @Input() darkModeEnabled!: boolean;
    @Output() sortForms = new EventEmitter<'title' | 'status' | 'updatedAt'>();
    @Output() toggleFormView = new EventEmitter<string>();
    tickIconValue = '';
    viewType = 'list';
    constructor() {}

    handleSortForms(type: 'title' | 'status' | 'updatedAt') {
        this.tickIconValue = type;
        this.sortForms.emit(type);
    }

    toggleView() {
        if (this.viewType === 'list') {
            this.viewType = 'grid';
        } else {
            this.viewType = 'list';
        }
        this.toggleFormView.emit(this.viewType);
    }
}
