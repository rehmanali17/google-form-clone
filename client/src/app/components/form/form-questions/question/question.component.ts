import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ALERTS } from '@app/constants';
import { Question } from '@models/question.model';
import { ShowErrorStateMatcher } from '@utils/error-state-matcher';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
    @Input() form!: FormGroup;
    @Input() question!: Question;
    matcher = new ShowErrorStateMatcher();

    constructor() {}

    resetOption() {
        this.form.get('answer')?.setValue('');
    }

    getErrorMessage() {
        return this.form.get('answer')?.hasError('required') && this.form.get('answer')?.touched
            ? ALERTS.REQUIRED_QUESTION
            : '';
    }
}
