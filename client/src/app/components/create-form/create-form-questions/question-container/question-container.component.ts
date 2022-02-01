import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ShowErrorStateMatcher } from '@utils/error-state-matcher';

@Component({
    selector: 'app-question-container',
    templateUrl: './question-container.component.html',
    styleUrls: ['./question-container.component.scss'],
})
export class QuestionContainerComponent {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('questionOverview') form!: FormGroup;
    @Output() typeChange = new EventEmitter<string>();
    matcher = new ShowErrorStateMatcher();

    constructor() {}

    getErrorMessage(control: string, field: string) {
        return this.form.get(control)?.hasError('required') && this.form.get(control)?.touched
            ? `${field} is required`
            : '';
    }

    handleSelectionChange() {
        this.typeChange.emit(this.form.get('type')?.value);
    }
}
