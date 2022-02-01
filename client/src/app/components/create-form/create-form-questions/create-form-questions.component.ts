import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-create-form-questions',
    templateUrl: './create-form-questions.component.html',
    styleUrls: ['./create-form-questions.component.scss'],
})
export class CreateFormQuestionsComponent implements OnInit {
    @Input() questionOverview!: FormGroup;
    @Input() options!: FormGroup;
    @Input() validations!: FormGroup;
    @Output() addQuestion = new EventEmitter();
    @Output() deleteQuestion = new EventEmitter();
    @Output() duplicateQuestion = new EventEmitter();
    questionType = '';

    constructor() {}

    ngOnInit() {
        this.questionType = this.questionOverview.value['type'];
    }

    handleTypeChange(type: string) {
        this.questionType = type;
    }

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
