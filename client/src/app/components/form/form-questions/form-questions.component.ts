import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ALERTS, LABELS } from '@app/constants';
import { Question } from '@models/question.model';

@Component({
    selector: 'app-form-questions',
    templateUrl: './form-questions.component.html',
    styleUrls: ['./form-questions.component.scss'],
})
export class FormQuestionsComponent {
    @Input() form!: FormGroup;
    @Input() questions: Question[] = [];
    snackBarRef!: MatSnackBarRef<any> | null;

    constructor(private snackBar: MatSnackBar) {}

    getAnswer(index: number) {
        return <FormGroup>(<FormArray>this.form.get('answers')).controls[index];
    }

    resetForm() {
        this.form.reset();
    }

    handleSubmit() {
        if (this.form.valid) {
            alert(JSON.stringify(this.form.value));
        } else {
            (<FormArray>this.form.get('answers')).controls.forEach((control, index) => {
                if (!control.valid) {
                    control.setErrors(['required']);
                    control.markAsTouched();
                }
            });
            this.snackBarRef = this.snackBar._openedSnackBarRef;
            if (!this.snackBarRef) {
                this.snackBar.open(ALERTS.INVALID_FORM, LABELS.DISMISS_SNACKBAR_TEXT);
            }
        }
    }
}
