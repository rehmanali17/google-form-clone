import { Component, Output, EventEmitter, Input } from '@angular/core';
import { VIEW_TYPES } from '@app/constants';
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
    viewType = VIEW_TYPES.LIST;
    constructor() {}

    handleSortForms(type: 'title' | 'status' | 'updatedAt') {
        this.tickIconValue = type;
        this.sortForms.emit(type);
    }

    toggleView() {
        if (this.viewType === VIEW_TYPES.LIST) {
            this.viewType = VIEW_TYPES.GRID;
        } else {
            this.viewType = VIEW_TYPES.LIST;
        }
        this.toggleFormView.emit(this.viewType);
    }
}
