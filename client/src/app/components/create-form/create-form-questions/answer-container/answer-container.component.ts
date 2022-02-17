import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, Validators, FormGroup } from '@angular/forms';
import { ALERTS } from '@app/constants';
import { ShowErrorStateMatcher } from '@utils/error-state-matcher';

@Component({
    selector: 'app-answer-container',
    templateUrl: './answer-container.component.html',
    styleUrls: ['./answer-container.component.scss'],
})
export class AnswerContainerComponent implements OnChanges {
    @Input() darkModeEnabled!: boolean;
    @Input() questionType = '';
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('options') form!: FormGroup;

    matcher = new ShowErrorStateMatcher();

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['questionType'].currentValue === 'multiple-choice') {
            if ((<FormArray>this.form.get('options')).length === 0) {
                (<FormArray>this.form.get('options')).push(
                    new FormControl('Option', Validators.required)
                );
            }
        } else {
            (<FormArray>this.form.get('options')).clear();
        }
    }

    getFormArray(): FormArray {
        return this.form.get('options') as FormArray;
    }

    addOption() {
        const control = new FormControl('Option', Validators.required);
        (<FormArray>this.form.get('options')).push(control);
    }

    removeOption(index: number) {
        if ((<FormArray>this.form.get('options')).length === 1) {
            return;
        }
        (<FormArray>this.form.get('options')).removeAt(index);
    }

    getErrorMessage(index: number) {
        const control = (<FormArray>this.form.get('options')).controls[index];
        return control.hasError('required') && control.touched ? ALERTS.REQUIRED_OPTION : '';
    }
}
