import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-actions-container',
    templateUrl: './actions-container.component.html',
    styleUrls: ['./actions-container.component.scss'],
})
export class ActionsContainerComponent {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('validations') form!: FormGroup;
    @Output() addQuestion = new EventEmitter();
    @Output() deleteQuestion = new EventEmitter();
    @Output() duplicateQuestion = new EventEmitter();
    constructor() {}

    handleAddQuestion() {
        this.addQuestion.emit();
    }

    handleDeleteQuestion() {
        this.deleteQuestion.emit();
    }

    handleDuplicateQuestion() {
        this.duplicateQuestion.emit();
    }
}
