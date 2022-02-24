import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ShowErrorStateMatcher } from '@utils/error-state-matcher';

@Component({
    selector: 'app-create-form-title',
    templateUrl: './create-form-title.component.html',
    styleUrls: ['./create-form-title.component.scss'],
})
export class CreateFormTitleComponent {
    @Input() darkModeEnabled!: boolean;
    matcher = new ShowErrorStateMatcher();
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('formOverview') form!: FormGroup;

    constructor() {}

    getErrorMessage(control: string, field: string) {
        if (this.form.get(control)?.hasError('required') && this.form.get(control)?.touched) {
            return `${field} is required`;
        }

        return this.form.get(control)?.hasError('pattern') && this.form.get(control)?.dirty
            ? `Enter alphabetic ${field}`
            : '';
    }
}
